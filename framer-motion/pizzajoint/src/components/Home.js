import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; //1.import

const Home = () => {
  return (
    <motion.div //원하는 곳에 motion붙이기,animate에 객체 형태로 css 넣기
      animate={{}}
      className="home container"
    >
      <motion.h2 animate={{}}>Welcome to Pizza Joint</motion.h2>
      <Link to="/base">
        <motion.button animate={{}}>Create Your Pizza</motion.button>
      </Link>
    </motion.div>
  );
};

export default Home;
