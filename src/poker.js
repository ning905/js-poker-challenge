const cardValueRef = [
  {
    card: '2',
    value: 2
  },
  {
    card: '3',
    value: 3
  },
  {
    card: '4',
    value: 4
  },
  {
    card: '5',
    value: 5
  },
  {
    card: '6',
    value: 6
  },
  {
    card: '7',
    value: 7
  },
  {
    card: '8',
    value: 8
  },
  {
    card: '9',
    value: 9
  },
  {
    card: '10',
    value: 10
  },
  {
    card: 'J',
    value: 11
  },
  {
    card: 'Q',
    value: 12
  },
  {
    card: 'K',
    value: 13
  },
  {
    card: 'A',
    value: 14
  }
]

const isPair = (twoCards) => {
  if (twoCards[0] === twoCards[1]) {
    return true
  }
  return false
}
console.log("Is ['9', '7'] a pair?", isPair(['9', '7']))

const is3OfAKind = (threeCards) => {
  if (isPair(threeCards) && threeCards[0] === threeCards[2]) {
    return true
  }
  return false
}

console.log(
  "Is ['9', '9', '9'] a three of a kind?",
  is3OfAKind(['9', '9', '9'])
)

const getCardValue = (thisCard) => {
  let thisCardValue

  for (let i = 0; i < cardValueRef.length; i++) {
    if (thisCard === cardValueRef[i].card) {
      thisCardValue = cardValueRef[i].value
    }
  }
  return thisCardValue
}

const getPairValue = (thisPair) => {
  const firstCard = thisPair[0]
  const firstCardValue = getCardValue(firstCard)
  const thisPairValue = firstCardValue * 2
  return thisPairValue
}

const getThreeCardsValue = (threeCards) => {
  const firstCard = threeCards[0]
  const firstCardValue = getCardValue(firstCard)
  const threeCardsValue = firstCardValue * 3
  return threeCardsValue
}

console.log("Get the value of ['K', 'K']: ", getPairValue(['K', 'K']))
console.log(
  "Get the value of ['K', 'K', 'K']: ",
  getThreeCardsValue(['K', 'K', 'K'])
)

class Poker {
  winningPair(firstPair, secondPair) {
    let theWinningPair = []
    if (isPair(firstPair) && isPair(secondPair)) {
      if (getPairValue(firstPair) > getPairValue(secondPair)) {
        theWinningPair = firstPair
      } else if (getPairValue(firstPair) < getPairValue(secondPair)) {
        theWinningPair = secondPair
      }
    } else if (isPair(firstPair)) {
      return firstPair
    } else if (isPair(secondPair)) {
      return secondPair
    }
    return theWinningPair
  }

  winningPairFromArray(cardArray) {
    let theWinningPair = []
    let biggestPairValue = 0

    const availablePairs = cardArray.filter(isPair)

    for (let i = 0; i < availablePairs.length; i++) {
      const thisPairValue = getPairValue(availablePairs[i])

      if (thisPairValue > biggestPairValue) {
        biggestPairValue = thisPairValue
        theWinningPair = availablePairs[i]
      }
    }
    return theWinningPair
  }

  winning3CardHand(cardArray) {
    let theWinningCards = []
    let biggestCardsValue = 0
    const available3OfAKind = cardArray.filter(is3OfAKind)
    const numOf3OfAKind = available3OfAKind.length

    for (let i = 0; i < cardArray.length; i++) {

      if (numOf3OfAKind > 0) {
        for (let j = 0; j < numOf3OfAKind; j++) {
          const theseThreeCardsValue = getThreeCardsValue(available3OfAKind[j])

          if (theseThreeCardsValue > biggestCardsValue) {
            biggestCardsValue = theseThreeCardsValue
            theWinningCards = available3OfAKind[j]
          }
        }
      } else {
        theWinningCards = this.winningPairFromArray(cardArray)
      }
    }
    return theWinningCards
  }
}
const poker = new Poker()
const cardArray = [
  ['5', '5', '3'],
  ['A', 'A'],
  ['7', '7', '7'],
  ['Q', 'J', '9']
]
console.log(poker.winning3CardHand(cardArray))

module.exports = Poker
