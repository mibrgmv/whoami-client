// import {login} from "../api/POST/login.ts";
// import z from "zod";
// import {useAuth} from "../AuthContext.tsx";
//
// const loginSchema = z.object({
//     username: z.string().min(1, {message: "Username is required"}),
//     password: z.string().min(1, {message: "Password is required"}),
// });
//
// export const useLogin = () => {
//     const {setLoginData} = useAuth();
//
//     return ({username, password}: { username: string, password: string }) => {
//         try {
//             const validationResult = loginSchema.safeParse({username, password});
//
//             if (!validationResult.success) {
//                 validationResult.error.issues.forEach((issue) => {
//                     if (issue.path[0] === 'username') {
//                         setUsernameError(issue.message);
//                     } else if (issue.path[0] === 'password') {
//                         setPasswordError(issue.message);
//                     }
//                 });
//                 return;
//             }
//
//             const loginResponse = await login(validationResult.data);
//             setLoginData({token: loginResponse.token, userId: loginResponse.userId});
//             setIsLoginSuccessful(true);
//         } catch (error: any) {
//             setError(error.message);
//         }
//     }
// }