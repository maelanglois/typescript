import { connect } from "./connect";
import { getUser } from "../models/Connected";

import { CLI } from "../CLI";

export async function solde(choice: CLI){
    const user = getUser();
    console.log("Votre solde est de " + user.solde);
    connect(choice);
}