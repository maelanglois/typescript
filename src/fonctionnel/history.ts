import { CLI } from "../CLI";

import { connect } from "./connect";
import { getUser } from "../models/Connected";

export async function history(choice: CLI) {
    const user = getUser();
    console.log("Historique de vos opérations :");
    const ten = user.historic.slice(-10);
    ten.forEach((entry, index) => {
        console.log(`${index + 1}. ${entry}`)
    })
    connect(choice);
}
