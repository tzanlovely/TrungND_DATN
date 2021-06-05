import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import {useState, useEffect} from 'react'
import QuoteList from '../../assets/quotes.json'

const QuotesContainer = () => {
    //Local state
    const [quote, setQuote] = useState({
        quoteContent: '',
        quoteAuthor: ''
    })

    const quoteData = QuoteList.quotes[Math.floor(Math.random() * QuoteList.quotes.length)];

    const handleClick = event => setQuote({
        quoteContent: quoteData.quote,
        quoteAuthor: quoteData.author
    })

    useEffect(() => handleClick(), [])

    return (
            <figure className="text-center">
                <blockquote className="blockquote">
                    <p className="mb-0">{quote.quoteContent}</p>
                </blockquote>
                <figcaption className="blockquote-footer">
                    <cite title="Source Title">{quote.quoteAuthor}</cite>
                </figcaption>
            </figure>
        
    )
}

export default QuotesContainer
