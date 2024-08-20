"use client";
import React, { useEffect, useState } from "react";
import wall from "../../../public/images/wallpaepr.png";
import Profileform from "../component/ProfileForm/Profileform";
import Image from "next/image";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useRouter } from "next/navigation";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../utils/firebaseconfig";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import {
  updateProfile,
  getAuth,
  onAuthStateChanged,
} from "firebase/auth";
import CircularProgress from "@mui/material/CircularProgress";

const db = getFirestore(app);
const auth = getAuth(app);

const Profile = () => {
  const storage = getStorage(app);
  const [image, setImage] = useState(wall);
  const [imageLoading, setImageLoading] = useState(false);
  const router = useRouter();
  const [userInfo, setUserInfo] = useState();

  const fetchUserInfoFromLocalStorage = () => {
    let user = localStorage.getItem("user");
    user = JSON.parse(user);
    if (user) {
      console.log(user, "user");
      setUserInfo(user);
      setImage(user.photoURL);
    }
  };

  useEffect(() => {
    fetchUserInfoFromLocalStorage();
  }, []);

  const setImageForFireStore = async (url, email) => {
    try {
      const usersRef = collection(db, "users");

      const q = query(usersRef, where("email", "==", email));

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        const userDocRef = doc(db, "users", userDoc.id);
        await updateDoc(userDocRef, {
          photoURL: url,
        });
      } else {
        console.log("No user found with the provided email.");
      }
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  const changeProfilePic = async (event) => {
    const fileName = userInfo?.uid;
    const file = event.target.files[0];

    if (file && fileName) {
      setImageLoading(true);

      const fileUpload = ref(storage, `profile_pictures/${fileName}`);
      const uploadTask = uploadBytesResumable(fileUpload, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          console.log(snapshot);
        },
        (error) => {
          console.log(error);
          setImageLoading(false);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            setImage(downloadURL);
            setImageLoading(false);

            const res = await updateProfile(auth.currentUser, {
              photoURL: downloadURL,
            });
            console.log(res, "res");

            const updatedUserInfo = {
              ...userInfo,
              photoURL: downloadURL,
            };

            setUserInfo(updatedUserInfo);
            localStorage.setItem("user", JSON.stringify(updatedUserInfo));

            await setImageForFireStore(downloadURL, userInfo.email);
          });
        }
      );
    }
  };

  return (
    <div className="bg-[#F5F7F8] flex h-screen justify-center items-center p-6 sm:p-10">
      <div className="border-[1px] shadow-2xl rounded-[10px] w-full max-w-[900px] h-[100%] grid grid-cols-1 md:grid-cols-6">
        <div
          className={`col-span-2 flex-col gap-2 rounded-[10px] bg-[#495E57] shadow-r-lg h-full flex justify-center items-center`}
        >
          <label
            htmlFor="profilePicInput"
            className="relative shadow-2xl h-[170px] w-[170px] rounded-full border-[3px] border-[#F4CE14] overflow-hidden group cursor-pointer"
          >
            <Image
              src={image}
              alt="user"
              width={500}
              height={500}
              className="object-cover h-full w-full"
              onLoad={() => setImageLoading(false)}
            />
            {imageLoading && (
              <div className="absolute inset-0 bg-black opacity-75 flex items-center justify-center">
                <CircularProgress color="success" />
              </div>
            )}
            <div
              className={`absolute inset-0 bg-black flex items-center justify-center transition-opacity duration-300 ${
                imageLoading ? "opacity-0" : "opacity-0 group-hover:opacity-75"
              }`}
            >
              <div className="text-center flex flex-col gap-2 items-center text-white">
                <ModeEditOutlineIcon />
                <p className="text-md">Change Profile Picture</p>
              </div>
            </div>
            <input
              id="profilePicInput"
              type="file"
              className="hidden"
              onChange={changeProfilePic}
            />
          </label>
          <div className="text-xl font-[600]">
            Hello, {userInfo?.displayName}
          </div>
          <div
            className="flex justify-center items-center cursor-pointer"
            onClick={() => {
              router.back();
            }}
          >
            <div className="">
              <KeyboardBackspaceIcon />
            </div>
            <div className="text-xl font-[400]">Back</div>
          </div>
        </div>
        <div className={`col-span-4 md:col-span-4 w-full h-full`}>
          <Profileform />
        </div>
      </div>
    </div>
  );
};

export default Profile;
