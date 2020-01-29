function testClass(){
    var glob =0;

    this.increment = () => {
        glob+=1;
    }
    this.show = () => {
        console.log(glob)
    } 
    this.decrement = () => {
        glob -= 1;
    }
}

module.exports = testClass;