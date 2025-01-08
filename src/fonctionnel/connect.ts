import prompts from "prompts";
import { retrait } from "./retrait";
import { depot } from "./depot";
import { solde } from "./solde";
import { CLI } from "../CLI";

// export let solde = 100;

/**
 * Fonction de connexion pour gérer les actions utilisateur.
 * @param cliInstance - Instance de la classe CLI pour accéder aux méthodes.
 */
export async function connect(choice: CLI) {
  const response = await prompts({
    type: "select",
    name: "action",
    message: "Quelle action voulez-vous faire ?",
    choices: [
      { title: "Déposer de l'argent", value: "depot" },
      { title: "Retirer de l'argent", value: "retrait" },
      { title: "Voir l'historique", value: "historique" },
      { title: "Voir le solde", value: "solde" },
      { title: "Quitter", value: "quitter" },
    ],
  });

  switch (response.action) {
    case "depot":
      await depot();
      break;
    case "retrait":
      await retrait();
      break;
    case "historique":
      console.log("Voir l'historique (fonctionnalité à implémenter).");
      break;
    case "solde":
      await solde();
      break;
    case "quitter":
      await choice.quit();
      break;
  }
}

 