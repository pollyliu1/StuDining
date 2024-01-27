// import { useRouter } from 'next/router'
// import RootLayout from './layout';

// export default function LoginPage() {
//       const [isLoggedIn, setIsLoggedIn] = useState(false);
//     const router = useRouter();
//     const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//       e.preventDefault();
//       // Add your authentication logic here if needed
//       router.push("/home");
//     };
  
//   return (
//     <RootLayout>
//     <form onSubmit={handleSubmit}>
//       <label>
//         Username:
//         <input type="text" name="username" required />
//       </label>
//       <label>
//         Password:
//         <input type="password" name="password" required />
//       </label>
//       <input type="submit" value="Log in" />
//     </form>
//     </RootLayout>
//   );
// }