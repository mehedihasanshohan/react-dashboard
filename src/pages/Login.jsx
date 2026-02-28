// eslint-disable-next-line no-unused-vars
import React, { useState, useRef } from "react";
// eslint-disable-next-line no-unused-vars
import { set, useForm } from "react-hook-form";
// eslint-disable-next-line no-unused-vars
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Eye, EyeOff, ShieldCheck, Zap, ArrowRight } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";

// const Login = () => {
//   // eslint-disable-next-line no-unused-vars
//   const { register, handleSubmit, formState: { errors } } = useForm();
//   const [showPassword, setShowPassword] = useState(false);
//   // eslint-disable-next-line no-unused-vars
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const { login } = useAuth();

//   const x = useMotionValue(0);
//   const y = useMotionValue(0);

//   const mouseXSpring = useSpring(x);
//   const mouseYSpring = useSpring(y);

//   const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
//   const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

//   const handleMouseMove = (e) => {
//     const rect = e.currentTarget.getBoundingClientRect();
//     const width = rect.width;
//     const height = rect.height;
//     const mouseX = e.clientX - rect.left;
//     const mouseY = e.clientY - rect.top;
//     const xPct = mouseX / width - 0.5;
//     const yPct = mouseY / height - 0.5;
//     x.set(xPct);
//     y.set(yPct);
//   };

//   const handleMouseLeave = () => {
//     x.set(0);
//     y.set(0);
//   };


// const onSubmit = async (formData) => {
//   setLoading(true);
//   try {
//     const response = await axios.post(
//       "https://task-api-eight-flax.vercel.app/api/login",
//       formData
//     );

//     if (response.data.token) {
//       // API theke 'name' ashbe na, tai amra email theke nam banabo
//       // Udahoron: "user1@example.com" theke "User1" nibe
//       const userName = response.data.email.split('@')[0];
//       const capitalizedName = userName.charAt(0).toUpperCase() + userName.slice(1);

//       const userData = {
//         id: response.data.id,
//         email: response.data.email,
//         name: capitalizedName // Ekhon Dashboard-e "User1" dekhabe
//       };

//       // AuthContext-er login call kora
//       login(response.data.token, userData);
//       navigate("/dashboard");
//     }
//   } catch (error) {
//     console.error("Login Error:", error);
//     alert("Invalid Credentials! Try: user1@example.com / password123");
//   } finally {
//     setLoading(false);
//   }
// };

//   return (
//     <div className="relative min-h-screen w-full bg-[#030014] flex items-center justify-center overflow-hidden font-sans">

//       <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

//       <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/30 rounded-full blur-[120px] animate-pulse" />
//       <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/30 rounded-full blur-[120px] animate-pulse" />

//       <motion.div
//         onMouseMove={handleMouseMove}
//         onMouseLeave={handleMouseLeave}
//         style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
//         className="relative z-10 w-full max-w-105 px-4"
//       >
//         <div className="relative group bg-slate-900/40 backdrop-blur-2xl border border-white/10 p-8 rounded-[2.5rem] shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] overflow-hidden">

//           {/* Animated Scanning Line */}
//           <motion.div
//             animate={{ top: ["0%", "100%", "0%"] }}
//             transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
//             className="absolute left-0 w-full h-0.5 bg-linear-to-r from-transparent via-blue-500/50 to-transparent z-0"
//           />

//           {/* Header Section */}
//           <div className="relative z-10 text-center mb-10">
//             <div className="inline-flex p-3 rounded-2xl bg-blue-500/10 border border-blue-500/20 mb-4">
//               <ShieldCheck className="w-8 h-8 text-blue-400" />
//             </div>
//             <h2 className="text-3xl font-black text-white tracking-tight italic">NEURAL LINK</h2>
//             <div className="h-1 w-12 bg-blue-500 mx-auto mt-2 rounded-full shadow-[0_0_10px_#3b82f6]" />
//           </div>

//           {/* <form onSubmit={handleSubmit((d) => console.log(d))} className="space-y-6 relative z-10"> */}
//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative z-10">

//             {/* Input Field: Identity */}
//             <div className="space-y-1">
//               <label className="text-[10px] uppercase tracking-[0.3em] text-blue-400 font-bold ml-1">Universal Identity</label>
//               <div className="relative">
//                 <input
//                   {...register("email", { required: true })}
//                   className="w-full bg-black/40 border border-white/5 rounded-xl py-4 px-5 text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 transition-all focus:shadow-[0_0_20px_rgba(59,130,246,0.1)]"
//                   placeholder="name@quantum.io"
//                 />
//                 <Zap className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-700" />
//               </div>
//             </div>

//             {/* Input Field: Passcode */}
//             <div className="space-y-1">
//               <label className="text-[10px] uppercase tracking-[0.3em] text-purple-400 font-bold ml-1">Access Passcode</label>
//               <div className="relative">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   {...register("password", { required: true })}
//                   className="w-full bg-black/40 border border-white/5 rounded-xl py-4 px-5 text-white placeholder:text-slate-600 focus:outline-none focus:border-purple-500/50 transition-all focus:shadow-[0_0_20px_rgba(168,85,247,0.1)]"
//                   placeholder="••••••••"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 hover:text-white"
//                 >
//                   {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                 </button>
//               </div>
//             </div>

//             {/* Futuristic Button */}
//             <motion.button
//               whileHover={{ scale: 1.02, letterSpacing: "0.1em" }}
//               whileTap={{ scale: 0.98 }}
//               className="w-full bg-white text-black font-black py-4 rounded-xl flex items-center justify-center gap-2 group transition-all"
//             >
//               INITIALIZE CONNECTION
//               <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//             </motion.button>
//           </form>

//           {/* Background Text Decor */}
//           <div className="absolute -bottom-4 -right-4 text-white/2 font-black text-7xl select-none pointer-events-none">
//             0101
//           </div>
//         </div>

//         {/* Status Indicator */}
//         <div className="mt-8 flex justify-center items-center gap-4">
//           <div className="flex items-center gap-2">
//             <span className="w-2 h-2 bg-green-500 rounded-full animate-ping" />
//             <span className="text-[10px] text-slate-500 font-bold tracking-widest uppercase">System Online</span>
//           </div>
//           <div className="h-4 w-1px bg-slate-800" />
//           <span className="text-[10px] text-slate-500 font-bold tracking-widest uppercase cursor-pointer hover:text-white transition-colors">Emergency Reset</span>
//         </div>
//       </motion.div>
//     </div>
//   );
// };



// ... (sobgulo import thik thak thakbe)

const Login = () => {
  // eslint-disable-next-line no-unused-vars
  const { register, handleSubmit, setValue, formState: { errors } } = useForm(); // setValue add kora hoyeche
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  // Mouse animation logic (unchanged)
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Demo Login Function
  const fillDemoCredentials = () => {
    setValue("email", "user1@example.com");
    setValue("password", "password123");
  };

  const onSubmit = async (formData) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://task-api-eight-flax.vercel.app/api/login",
        formData
      );

      if (response.data.token) {
        const userName = response.data.email.split('@')[0];
        const capitalizedName = userName.charAt(0).toUpperCase() + userName.slice(1);

        const userData = {
          id: response.data.id,
          email: response.data.email,
          name: capitalizedName
        };

        login(response.data.token, userData);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("Invalid Credentials! Try: user1@example.com / password123");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#030014] flex items-center justify-center overflow-hidden font-sans">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/30 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/30 rounded-full blur-[120px] animate-pulse" />

      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative z-10 w-full max-w-105 px-4"
      >
        <div className="relative group bg-slate-900/40 backdrop-blur-2xl border border-white/10 p-8 rounded-[2.5rem] shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] overflow-hidden">

          <motion.div
            animate={{ top: ["0%", "100%", "0%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent z-0"
          />

          <div className="relative z-10 text-center mb-10">
            <div className="inline-flex p-3 rounded-2xl bg-blue-500/10 border border-blue-500/20 mb-4">
              <ShieldCheck className="w-8 h-8 text-blue-400" />
            </div>
            <h2 className="text-3xl font-black text-white tracking-tight italic">NEURAL LINK</h2>
            <div className="h-1 w-12 bg-blue-500 mx-auto mt-2 rounded-full shadow-[0_0_10px_#3b82f6]" />
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative z-10">
            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-[0.3em] text-blue-400 font-bold ml-1">Universal Identity</label>
              <div className="relative">
                <input
                  {...register("email", { required: true })}
                  className="w-full bg-black/40 border border-white/5 rounded-xl py-4 px-5 text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 transition-all focus:shadow-[0_0_20px_rgba(59,130,246,0.1)]"
                  placeholder="name@quantum.io"
                />
                <Zap className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-700" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-[0.3em] text-purple-400 font-bold ml-1">Access Passcode</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", { required: true })}
                  className="w-full bg-black/40 border border-white/5 rounded-xl py-4 px-5 text-white placeholder:text-slate-600 focus:outline-none focus:border-purple-500/50 transition-all focus:shadow-[0_0_20px_rgba(168,85,247,0.1)]"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 hover:text-white"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02, letterSpacing: "0.1em" }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-white text-black font-black py-4 rounded-xl flex items-center justify-center gap-2 group transition-all disabled:opacity-50"
            >
              {loading ? "INITIALIZING..." : "INITIALIZE CONNECTION"}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            {/* New Demo Login Button */}
          <span
            onClick={fillDemoCredentials}
            className="text-[16px] text-blue-400 font-bold tracking-widest uppercase cursor-pointer hover:text-white hover:underline transition-all"
          >
            Demo Credentials
          </span>
          </form>

          <div className="absolute -bottom-4 -right-4 text-white/5 font-black text-7xl select-none pointer-events-none">
            0101
          </div>
        </div>

        {/* Footer with Demo Button */}
        <div className="mt-8 flex flex-wrap justify-center items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-ping" />
            <span className="text-[10px] text-slate-500 font-bold tracking-widest uppercase">System Online</span>
          </div>
          <div className="h-4 w-[1px] bg-slate-800" />



          <div className="h-4 w-[1px] bg-slate-800" />
          <span className="text-[10px] text-slate-500 font-bold tracking-widest uppercase cursor-pointer hover:text-white transition-colors">Emergency Reset</span>
        </div>
      </motion.div>
    </div>
  );
};


export default Login;