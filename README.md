# trees

Research Assistant to Professor Bruce Rannala. 

Objective: move phylogenetic tree project from destop to web.


############# Simple Add-On Function Descriptions ###############

TreeUtils.js => 

// class functions
1. this.printTheta -> used in this.postorder to output theta values on tree
2. this.drawRootTheta -> same ad this.printTheta but only used on root node
3. this.swap -> takes a node and nodeID, recursively look through the tree until it finds a match and then swap the children nodes
4. this.newSpeciesOrder -> calles ExtractSpeciesOrder and returns the new list of species names
5. this.display -> diplays node index on canvas for user to select which node to flip
6. this.newickFromTree -> calls ExtractSpeciesOrder and returns the a new list of species name that has been reordered. 
7. this.DrawIndex -> recursively look through the current tree and calling this.drawIndexToCanvas on the correct nodes. 
8. this.drawInexToCanvas -> physically drawing the circle and text to the selection bubble
9. this.createCircles -> called in this.drawIndexToCanvas to add a record of a new circle in the global this.circle object, which will be later used for hit-detection in the React side. 
10. this.swapNodes -> 

// Functions: 
1. Swap -> recursively look for the correct node via node index and then swapping the selected node's children.
2. ExtractSpeciesOrder -> recursively look through the current tree and gathering Species name information in the correct order. Called by this.newickFromTree. 
3. EnumerateTree -> recursively look through the current tree and assigning nodes indices with an instance of the Indexer. 

// Functional Classes: 
1. Indexer -> A simple indexer class that assigns nodes with id number while keeping track of the number of indicies. 

// How branch swapping works: 
Event driven canvas operations: 
Origin: components/Canvas.js -> toggleIndexDisplay
//////
The "Display Node ID" button triggers toggleIndexDisplay(), which creates/reassigns this.utils.circles (global var in utils libray) to an enpty list. This function also toggles the Canvas.js class global boolean "this.DisplayIndex". If this.DisplayIndex == true, the function will call runDisplayIndex(), which will in turn call the utils libary's diaplayIndex function which is documented above. At this point the intersection bubbles will be drawn. In the componentDidMount lifecycle method of Canvas.js, we have already added an click event listener that executes when the utils.circls list is not empty. In this event, we will call the IntersectWithcircle method, which takes the click position (adjusted with canvas) and calculates whether the user clicked on a circle. If intersects -> we will swapNodes and then display the new tree. 






