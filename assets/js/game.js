const gameCore = (()=>{
    'use strict';
    let deck           = [];
    const cardTypes    = ['C','D','H','S'],
          specialTypes = ['A','J','Q','K'];

    let playersPoints = [];

    // Get btns from index
    const btnGetCard   = document.querySelector('#btnGetCard'),
    btnStop      = document.querySelector('#btnStop'),
    btnNewGame   = document.querySelector('#btnNewGame');

    const divPlayersCards = document.querySelectorAll('.divCartas'),
          divPlayersPoints = document.querySelectorAll('small');


    /**
    * Starts the game, clean score and make new deck.
    */
    function startGame() {
        deck = newDeck();
        cleanScore();
        btnGetCard.disabled = false;
        btnStop.disabled = false;
        btnNewGame.disabled = true;
        firstDealing();
    }


    /**
    * Creates a new deck and shuffle it
    */
    function newDeck(){

        deck = [];
        for( let i = 2; i <= 10; i++ ) {
            for( let type of cardTypes ) {
                deck.push( i + type);
            }
        }

        for( let type of cardTypes ) {
            for( let spcl of specialTypes ) {
                deck.push( spcl + type);
            }
        }
        return _.shuffle( deck );
    }


    /**
    * Cleans score in this script and html
    */
    function cleanScore(numPlayers = 2){
        playersPoints = [];
        for (let i = 0; i < numPlayers; i++) {
            playersPoints.push({ points: 0, aceCount: 0});
        }
        divPlayersPoints.forEach(elem => elem.innerText = 0);
        divPlayersCards.forEach(elem => elem.innerHTML = '');
    }


    /**
     * Gives 2 cards to first player and Dealer, but Dealer has only one rendered card
     */
    function firstDealing(){
        const card1 = takeCard();
        let player0Points = savePoints(0, card1);
        displayCard( 0,card1 );

        const card2 = takeCard();
        player0Points= savePoints(0, card2);
        displayCard( 0,card2 );
    
        const card3 = takeCard();
        savePoints(1, card3);
        displayCard( 1, card3 );

        // Yes, Dealer actually gets one card. In terms of randomness, no one knows what comes next.
        displayCard( 1 );

        if ( gratterThan20(player0Points) === true) {
            dealerTurn( player0Points );
        }
    }

    /**
    * Take the last card from a deck
    */
    function takeCard (){
        if ( deck.length === 0 ) {
            throw 'There is no cards in deck, somenthing went wrong';
        }
        return deck.pop();
    }


    /**
    * Get value of a given card
    * @param {[string]} card from the deck
    * @return int value of the card 2 to 11
    */
    function getCardValue( card ){
        const value = card.substring(0, card.length - 1);
        return ( isNaN( value ) ) ? 
                ( value === 'A' ) ? 11 : 10
                : value * 1;
    }


    /**
    * Save user's points, show it, and find best value for aces if any
    * @param {[int]} player index of the player to save points
    * @param {[int]} points the result of getCardValue()
    * @return current user's points
    */
    function savePoints(player, card){
        const cardValue = getCardValue(card)

        // Find if player has an ace
        if(cardValue === 11){
            playersPoints[player]['aceCount'] +=1;
        }

        playersPoints[player]['points'] += cardValue;
        

        // if points > 21 and player has a ace, make ace's value 1
        if( playersPoints[player]['points'] > 21 && playersPoints[player]['aceCount'] > 0){
            playersPoints[player]['points'] -= 10;
            playersPoints[player]['aceCount'] -=1;
        }

        // Display player's points
        divPlayersPoints[player].innerText = playersPoints[player]['points'];
        return playersPoints[player]['points'];
    }


    /**
    * Display card in html
    * @param {[int]} player index of the player to find div
    * @param {[string]} card name of the card to display
    * @return current user's points
    */
    function displayCard(player, card='grey_back'){

        const cardImg = document.createElement('img');
        cardImg.src = `assets/cartas/${ card }.png`;
        cardImg.classList.add('pockerCard');
        divPlayersCards[player].append( cardImg );

    }


    /**
    * Dealer(com) will try to win
    */
    function dealerTurn( player0Points ){
        let dealerPoints = 0;
        divPlayersCards[1].removeChild(divPlayersCards[1].children[1])
    
        do {
            const card = takeCard();
            dealerPoints = savePoints(1, card);
            displayCard(1, card);

        }while(  (dealerPoints < player0Points)  && (player0Points <= 21 ) );
        findWinner();
        }


    /**
    * Find winner
    */
    function findWinner(){

        // For now there is only 2 players
        const dealerPoints = playersPoints[1]['points'], player0Points = playersPoints[0]['points'];

        setTimeout(() => {
            if( dealerPoints === player0Points ) {
                alert('Nadie gana :(');
            } else if ( player0Points> 21 ) {
                alert('Dealer gana')
            } else if( dealerPoints > 21 ) {
                alert('Jugador Gana');
            } else {
                alert('Computadora Gana')
            }
        }, 100 );
        btnNewGame.disabled = false;
    }

    /**
     * Check if player can play
     * @param {int} points current player points
     * @returns true if is gratterThan20
     */
    function gratterThan20(points){
        if ( points >= 21 ) {
            btnGetCard.disabled   = true;
            btnStop.disabled = true;
            return true;
        }
        return false;
    }


    // Eventos
    btnGetCard.addEventListener('click', () => {

        const card = takeCard();
        const player0Points = savePoints(0, card);
            
        displayCard( 0,card );
    
    
        if ( gratterThan20(player0Points) ) {
            dealerTurn( player0Points );
        }
    
        });
    
    
        btnStop.addEventListener('click', () => {
            btnGetCard.disabled   = true;
            btnStop.disabled = true;
    
            dealerTurn( playersPoints[0]['points'] );
        });
    
        return {
            newGame: startGame
        };

})();
