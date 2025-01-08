import bcrypt from "bcryptjs";

export type User = {username: string, password: string, solde: number, historic: string[]};

// export async function hash(): Promise<User[]> {
//     const salt = 10;

//     return [
//         {
//             username: "username",
//             password: await bcrypt.hash("password", salt),
//             solde: 0,
//         }
//     ]
// }