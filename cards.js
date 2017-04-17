var Cards = function(front, back) {
    this.front = front;
    this.back = back;

}

Cards.prototype.printFront = function() {
    console.log(this.front);

}


Cards.prototype.printAnswer = function() {
    console.log('Wrong, the correct answer is ' + this.back + '.');
}

module.exports = Cards;
