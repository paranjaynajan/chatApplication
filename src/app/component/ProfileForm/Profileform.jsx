import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ResetPassword from "../ResetPassword/ResetPassword";
import UpdateProfile from "../UpdateProfile/UpdateProfile";
import Changepassword from "../ChangePassword/ChangePassword";

const Profileform = () => {
  const [state, setState] = useState({ toggle: true, x: 0 });

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05 },
    pressed: { scale: 0.95 },
  };

  const animateFun = () => {
    setState((prevState) => ({
      toggle: !prevState.toggle,
      x: prevState.toggle ? 20 : 0,
    }));
  };

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  return (
    <div className="flex justify-center h-full p-5 md:items-center flex-col gap-10">
    <div className="flex justify-center items-center ">

      <div className="h-[70px] w-full max-w-[500px] bg-black flex justify-between items-center rounded-full py-2 sm:py-4 px-8 xs:px-10 shadow-lg">
        {!state.toggle && (
          <div
            onClick={animateFun}
            className="cursor-pointer px-2 sm:px-4 py-2 text-base sm:text-lg text-center font-[600] flex justify-center items-center text-[#F4CE14]"
          >
            Update Profile
          </div>
        )}
        <motion.div
          className={`px-2 sm:px-4 py-2 text-base sm:text-lg font-[600] flex justify-center items-center bg-[#F4CE14] text-black h-[40px] sm:h-[50px] w-[150px] sm:w-[200px] text-center cursor-pointer rounded-full`}
          style={{ boxShadow: "inset 0 6px 10px rgba(0, 0, 0, 0.5)" }}
          animate={{ x: state.x }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="pressed"
        >
          {state.toggle ? "Update Profile" : "Change Password"}
        </motion.div>
        {state.toggle && (
          <div
            onClick={animateFun}
            className="cursor-pointer px-2 sm:px-4 py-2 text-base sm:text-lg font-[600] text-center flex justify-center items-center text-[#F4CE14]"
          >
            Change Password
          </div>
        )}
      </div>
    </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={state.toggle ? "reset" : "update"}
          variants={formVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="scroll-container3 profileHeight overflow-auto"
        >
          {state.toggle ?  <UpdateProfile />:<Changepassword/> }
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Profileform;
