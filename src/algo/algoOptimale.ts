
// A- Calcul potentiel

import { Edge } from "reactflow";

// Étape 1 : mitady ny valeur maximale parmi toutes les cellules mi affihe eo am le graphe
const Optimale = (edges: Edge[])=>{
const valeursCellules: number[] = []; // stockena anat tableau n valeurs n cellules rehetra ahita am le graphe 
edges.forEach((edge: Edge) => {
    const sourceNodeId: string = edge.source;
    const destinationNodeId: string = edge.target; //target : destination , edge: arete
    const sourceNodeValue: number = getValueOfNode(sourceNodeId); // pour obtenir la valeur de la cellule du nœud source
    const destinationNodeValue: number = getValueOfNode(destinationNodeId); //pour obtenir la valeur de la cellule du nœud destination
    valeursCellules.push(sourceNodeValue, destinationNodeValue);
});
const valeurMaximale: number = Math.max(...valeursCellules);

// Étape 2 : Calcul n potentiel initial
let potentiel: number = valeurMaximale + 0;

// pour stocker l'état des potentiels des noeuds oe efa manana potentiel ve sa tsi 
const nodePotentials: { [key: string]: boolean } = {};

// Étape 3 : Calcul n potentiels n nœuds source et destination
while (!checkIfAllNodesHavePotential(nodePotentials)) {
    edges.forEach((edge: any) => {
        const sourceNodeId: string = edge.source;
        const destinationNodeId: string = edge.target;
        const sourceNodeValue: number = getValueOfNode(sourceNodeId);
        const destinationNodeValue: number = getValueOfNode(destinationNodeId);

        // potentiel du nœud source => potentielSrc - ValeurNoeudDest 
        potentiel -= sourceNodeValue;

        // potentiel du nœud destination => potentielSrc + ValeurNoeudDest
        potentiel += destinationNodeValue;

        // Mise à jour de l'état des potentiels des nœuds
        nodePotentials[sourceNodeId] = true;
        nodePotentials[destinationNodeId] = true;
    });
}

// ivérifier si tous les nœuds ont un potentiel ou pas
function checkIfAllNodesHavePotential(nodePotentials: { [key: string]: boolean }): boolean {
    // Parcours de chaque nœud et vérification de son état de potentiel
    for (const nodeId in nodePotentials) {
        if (!nodePotentials[nodeId]) {
            return false; // S'il manque un potentiel pour l'un des nœuds, retourne false
        }
    }
    return true; // Si tous les nœuds ont un potentiel assigné, retourne true
}

// B- Calcul coût marginaux delta(x,y)

function calculateMarginalCosts(baseSolution: any, potentials: { [key: string]: number }, graph: any): { [key: string]: number } {
    const delta: { [key: string]: number } = {};
    for (const sourceNode in graph) {
        for (const destinationNode in graph[sourceNode]) {
            // delta(x,y) = potentielLigne + valeur arête - potentielColonne   ou Vx + C(x,y) - Vy
            const cost: number = potentials[sourceNode] + graph[sourceNode][destinationNode] - potentials[destinationNode];
            delta[`${sourceNode}-${destinationNode}`] = cost;
        }
    }
    return delta;
}

// Fonction pour trouver une chaîne de substitution  (ze positive)
function findSubstitutionChain(delta: { [key: string]: number }, graph: any): string[] | null {
    let chain: string[] | null = null;
    let minDelta: number = Infinity;

    // Recherche delta(x,y) négatif (exception)
    for (const edge in delta) {
        if (delta[edge] < 0 && delta[edge] < minDelta) {
            minDelta = delta[edge];
            chain = edge.split('-');
        }
    }

    // Si une chaîne de substitution est trouvée, retourne-la
    if (chain) {
        return chain; // Retourne les nœuds correspondant à l'arête
    }

    return null;
}

// Calcul des coûts marginaux
const delta: { [key: string]: number } = calculateMarginalCosts(baseSolution, potentiel, graph);
// Recherche d'une chaîne de substitution si nécessaire
const substitutionChain: string[] | null = findSubstitutionChain(delta, graph);

// C- Calcul gain

function calculateNegativeCostsGains(delta: { [key: string]: number }, graph: any): number {
    let totalGain: number = 0;

    // Parcourir les coûts marginaux pour trouver les coûts marginaux négatifs 
    for (const edge in delta) {
        if (delta[edge] < 0) {
            // Rechercher une chaîne de substitution pour ce coût marginal négatif
            const substitutionChain: string[] | null = findSubstitutionChain(delta, graph);
            if (substitutionChain) {
                const gain: number = -delta[edge] * calculateSubstitutionQuantity(substitutionChain, graph);
                totalGain += gain;
            }
        }
    }

    return totalGain;
}

function calculateSubstitutionQuantity(substitutionChain: string[], graph: any): number {
    let minCapacity: number = Infinity;

    for (let i = 0; i < substitutionChain.length; i++) {
        const edge: string = substitutionChain[i];
        const [source, destination]: string[] = edge.split('-');

        // Trouver la capacité minimale le long de la chaîne
        if (graph[source][destination] < minCapacity) {
            minCapacity = graph[source][destination];
        }
    }

    return minCapacity;
}
const negativeCostsGains: number = calculateNegativeCostsGains(delta, graph);

// D- Calcul Solution Optimale

function calculateOptimalSolution(baseSolution: any, potentials: { [key: string]: number }, graph: any): any {
    // A Répéter jusqu'à ce qu'aucun coût marginal ne soit négatif
    while (Object.values(delta).some(cost => cost < 0)) {
        potentiel = calculatePotentials(baseSolution, graph);
        // Recalcul n coûts marginaux avec les nouveaux potentiels
        delta = calculateMarginalCosts(baseSolution, potentiel, graph);
        // Recalcul n les gains obtenus par l'utilisation des relations de coûts marginaux négatifs
        const newNegativeCostsGains: number = calculateNegativeCostsGains(delta, graph);
        // Ajout nouveaux gains obtenus à la solution de base
        for (const edge in baseSolution) {
            baseSolution[edge] += newNegativeCostsGains;
        }
    }

    return baseSolution;
}

const optimalSolution: any = calculateOptimalSolution(baseSolution, potentials, graph);
}