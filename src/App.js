import React, {useState} from 'react';
import './App.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


function App() {
  const [text, setText] = useState('')
  const [memes, setMemes] = useState([])
  
  async function getMemes(){
    const key='AitgzNZBJNonm2fIFf7fc6EsGIuRfS0a'
    let url = 'https://api.giphy.com/v1/gifs/search?'
    url += 'api_key=' + key
    url += '&q=' + text + '&limit=25&offset=0&rating=G&lang=en'
    const r = await fetch(url)
    const body = await r.json()
    setMemes(body.data)
    setText('')
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
          </Button>
          {/* <div></div> */}
        </div>

      </header>

      <div className="memes">
        {memes.map((meme, i)=> <Meme key={i} {...meme} />)}
      </div>
    </div>
  );
}

function Meme({title, images}){
  return (
  <div className = "meme">
    <img src={images.fixed_height.url} alt="meme" />
    <div className="meme-title">{title}</div> {/*SEE GITHUB*/}
  </div>)
}


export default App;
