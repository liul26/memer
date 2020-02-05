import React, {useState} from 'react';
import './App.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Search } from '@material-ui/icons';
import CircularProgress from '@material-ui/core/CircularProgress';


function App() {
  const [text, setText] = useState('')
  const [memes, setMemes] = useState([])
  const [loading, setLoading] = useState(false)
  
  async function getMemes(){
    setLoading(true)
    const key='AitgzNZBJNonm2fIFf7fc6EsGIuRfS0a'
    let url = 'https://api.giphy.com/v1/gifs/search?'
    url += 'api_key=' + key
    url += '&q=' + text + '&limit=50&offset=0&rating=G&lang=en'
    const r = await fetch(url)
    const body = await r.json()
    setMemes(body.data)
    setText('')
    setLoading(false)

  }

  console.log(memes)

    return (
      <div className="App">
        <header className="App-header">
          <div className="input-wrap">
            <TextField fullWidth variant="outlined" 
              label="Search for memes!"
              value={text} /*IMPORTANT*/
              onChange={e=> setText(e.target.value)} /*IMPORTANT*/
              onKeyPress={e=> {if(e.key==='Enter') getMemes()}}
            />
            <Button variant="contained" color="primary" onClick={getMemes}>
              Search
              <Search style={{height:30, width:30}}/>
            </Button>
            {/* <div></div> */}
          </div>
        </header>
        <div className="memes">
          {memes.map((meme, i)=> <Meme key={i} {...meme} />)}
          <div className="loading-wrap">
            {loading && <CircularProgress color='secondary' className='loading-circle'/>}</div>
        </div>
      </div>
    );
}

function Meme({title, images}){
  const url = images.fixed_height.url
  return (
    <div className="meme" onClick={()=>window.open(url, '_blank')}>
     {/* images.fixed_height. <-- also ok to take out below */}
    <img src={images.fixed_height.url} alt="meme" />
    <div className="meme-title">{title}</div>
  </div>)
}

// function Meme({images, title}){
//   const {meme} = props
//   const url = meme.images.fixed_height.url
//   return (<div className="meme" onClick={()=>window.open(url, '_blank')}>
//     <div className="meme-title">{title}</div>
//     <img height="200" alt="meme" src={url} />
//   </div>)
// }

export default App;
