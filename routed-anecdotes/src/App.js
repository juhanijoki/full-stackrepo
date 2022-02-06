import React, { useState } from 'react'
import { useRouteMatch,
  Switch, Route, Link,
  Redirect
} from 'react-router-dom'
import { useField } from './hooks'
// Menussa näytetään linkit sovelluksen eri näkymiin.
const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Link style={padding} to='/anecdotes'>anecdotes</Link>
      <Link style={padding} to='/create'>create new</Link>
      <Link style={padding} to='/about'>about</Link>
    </div>
  )
}


const AnecdoteList = (props) => {
  props.show()
  return (
    <div>
      <h2>Anecdotes</h2>
      <ul>
        {props.anecdotes.map(anecdote => <li key={anecdote.id} >
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
        </li>)}
      </ul>
    </div>
  )
}

// Yksittäisen anekdootin näyttäminen.
const Anecdote = ({ anecdote }) => {
  return (
    <div>
      <h2>{anecdote.content} by {anecdote.author}</h2>
      <p>has {anecdote.votes} votes</p>
      <p>for more info see {anecdote.info}</p>
    </div>
  )
}

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/tkt21009'>Full Stack -websovelluskehitys</a>.

    See <a href='https://github.com/fullstack-hy/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

// Luodaan uusi anekdootti propsien addnew-funktiolla.
const CreateNew = (props) => {
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')

  // Lisää uuden anekdootin listaan ja 
  // vaihtaa clicked-funktion tilan.
  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    props.clicked(props.button)
  }

  // Tyhjentää lomakkeen.
  const handleReset = (e) => {
    e.preventDefault()
    content.empty()
    author.empty()
    info.empty()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <div>
          content
          <input
            name='content'
            type={content.type}
            value={content.value}
            onChange={content.onChange}
          />
        </div>
        <div>
          author
          <input 
            name='author'
            type={author.type}
            value={author.value}
            onChange={author.onChange}
          />
        </div>
        <div>
          url for more info
          <input
           name='info' 
           type={info.type}
           value={info.value} 
           onChange={info.onChange}
          />
        </div>
        <button type='submit'>create</button>
        <button type='reset'>reset</button>
      </form>
    </div>
  )
}


const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])
  const [state, setState] = useState(true)

  const [notification, setNotification] = useState('')

  // Luodaan uusi anecdotes lista ja tehdään ilmoitus
  // lisäyksestä.
  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(`a new anecdote ${anecdote.content} created!`)
    setTimeout(() => {
      setNotification(null)
    }, 10000)
  }
  // Vaihtaa buttonStaten tilan.
  const clicked = (button) => {
    // buttonState = !button
    console.log('clicked', button)
    setState(button)
  }

  // Kutsumalla tekee create-komponentin näkyväksi.
  const showCreateNew = () => {
    setState(true)
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  const match = useRouteMatch('/anecdotes/:id')
  const anecdote = match 
    ? anecdotes.find(anecdote => anecdote.id === match.params.id)
    : null

  return (
    <div>
      <h1>Software anecdotes</h1>
        <Menu />
        {notification}
      <Switch>
        <Route path='/anecdotes/:id'>
          <Anecdote anecdote={anecdote} />
        </Route>
        <Route path='/create' >
          {state ? <CreateNew addNew={addNew}
            clicked={clicked}
            button={!state}/>
            : <Redirect to='/' />}
        </Route>
        <Route path='/anecdotes'>
          <AnecdoteList anecdotes={anecdotes} show={showCreateNew} />
        </Route>
        <Route path='/about'>
          <About />
        </Route>
        <Route path='/'>
          <AnecdoteList anecdotes={anecdotes} show={showCreateNew} />
        </Route>
      </Switch>
      <Footer />
    </div>
  )
}

export default App