# trees

Research Assistant to Professor Bruce Rannala. 

Objective: move phylogenetic tree project from destop to web.



note: for function getMaxHeight, I will stick to using the global var "maxHeight" declared in treeUtils. But should be optimized to where the function returns a value upon 


########### Simple Add-On Function Descriptions ###############
TreeUtils.js => 

// class functions
1. this.printTheta -> used in this.postorder to output theta values on tree
2. this.drawRootTheta -> same ad this.printTheta but only used on root node
3. this.newickFromTree -> gets new species name order after swap
4. this.display -> diplays node index on canvas for user to select which node to flip
5. this.newickFromTree -> calls ExtractSpeciesOrder and returns the a new list of species name that has been reordered. 
6. this.DrawIndex -> recursively look through the current tree and calling this.drawIndexToCanvas on the correct nodes. 
7. this.drawInexToCanvas -> physically drawing the circle and text to the selection bubble
8. this.createCircles -> called in this.drawIndexToCanvas to add a record of a new circle in the global this.circle object, which will be later used for hit-detection in the React side. 
9. this.swapNodes -> 

// Functions: 
1. Swap -> recursively look for the correct node via node index and then swapping the selected node's children.
2. ExtractSpeciesOrder -> recursively look through the current tree and gathering Species name information in the correct order. Called by this.newickFromTree. 
3. EnumerateTree -> recursively look through the current tree and assigning nodes indices with an instance of the Indexer. 

// Functional Classes: 
1. Indexer -> A simple indexer class that assigns nodes with id number while keeping track of the number of indicies. 









