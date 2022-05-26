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

const is3OfAKind = (threeCards) => {
  if (isPair(threeCards) && threeCards[0] === threeCards[2]) {
    return true
  }
  return false
}

const getFirstCardValue = (thisCard) => {
  let firstCardValue
  const firstCard = thisCard[0]

  for (let i = 0; i < cardValueRef.length; i++) {
    if (firstCard === cardValueRef[i].card) {
      firstCardValue = cardValueRef[i].value
    }
  }
  return firstCardValue
}

const getPairValue = (thisPair) => {
  const thisPairValue = getFirstCardValue(thisPair) * 2
  return thisPairValue
}

const storeBiggerCards = (value, cards, valueToCompare, cardsToCompare) => {
  const CARDS = {
    VALUE: value,
    CARDS: cards
  }
  if (value < valueToCompare) {
    CARDS.VALUE = valueToCompare
    CARDS.CARDS = cardsToCompare
  }

  return CARDS
}

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
    let theWinningCards = []
    let biggestCardsValue = 0

    const availablePairs = cardArray.filter(isPair)

    for (let i = 0; i < availablePairs.length; i++) {
      const thisPairValue = getPairValue(availablePairs[i])

      const THE_WINING_CARDS = storeBiggerCards(
        biggestCardsValue,
        theWinningCards,
        thisPairValue,
        availablePairs[i]
      )

      biggestCardsValue = THE_WINING_CARDS.VALUE
      theWinningCards = THE_WINING_CARDS.CARDS
    }
    return theWinningCards
  }

  winning3CardHand(cardArray) {
    let theWinningCards = []
    const available3OfAKind = cardArray.filter(is3OfAKind)
    const numOf3OfAKind = available3OfAKind.length

    if (numOf3OfAKind > 0) {
      theWinningCards = this.winningPairFromArray(available3OfAKind)
    } else {
      theWinningCards = this.winningPairFromArray(cardArray)
    }
    return theWinningCards
  }
}

module.exports = Poker
