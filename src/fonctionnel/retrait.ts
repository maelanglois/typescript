import prompts from "prompts";
import { connect } from "./connect";
import { CLI } from "../CLI";
import { getUser } from "../models/Connected";

export async function retrait(choice: CLI){
  const date = new Date();
  const datePropre = date.getDate() + "/" +  (date.getMonth() + 1) + "/" + date.getFullYear();

  const user = getUser();
  const retirer = await prompts({
    type: "number",
    name: "retrait",
    message:"Combien d'argent voulez-vous retirer ?",
    validate: (retrait) => (Number.isInteger(retrait) && retrait > 0 ? true : "Vous devez retirer un montant supérieur à 0.")
})

  if(retirer.retrait > user.solde) {
    console.log("Votre solde est trop bas pour ce retrait.")
    user.historic.push("Retrait échoué de " + retirer.retrait + "€, solde après opération : " + user.solde + "€ (" + datePropre + ")")
    return connect(choice);
  }

  user.solde -= retirer.retrait;
  console.log("Votre nouveau solde est de " + user.solde);

  user.historic.push("Retrait réussi de " + retirer.retrait + "€, solde après opération : " + user.solde + "€ (" + datePropre + ")")
  connect(choice);
}