import React from 'react'
import Moment from 'moment'
import FileBrowser, {Icons} from 'react-keyed-file-browser'
import '../node_modules/react-keyed-file-browser/dist/react-keyed-file-browser.css';

class App extends React.Component {
  state = {
    files: [
      {
        key: 'cat in a hat.png',
        modified: +Moment().subtract(1, 'hours'),
        size: 1.5 * 1024 * 1024,
      },
      {
        key: 'kitten_ball.png',
        modified: +Moment().subtract(3, 'days'),
        size: 545 * 1024,
      },
      {
        key: 'elephants.png',
        modified: +Moment().subtract(3, 'days'),
        size: 52 * 1024,
      },
      {
        key: 'funny fall.gif',
        modified: +Moment().subtract(2, 'months'),
        size: 13.2 * 1024 * 1024,
      },
      {
        key: 'holiday.jpg',
        modified: +Moment().subtract(25, 'days'),
        size: 85 * 1024,
      },
      {
        key: 'letter chunks.doc',
        modified: +Moment().subtract(15, 'days'),
        size: 480 * 1024,
      },
      {
        key: 'export.pdf',
        modified: +Moment().subtract(15, 'days'),
        size: 4.2 * 1024 * 1024,
      },
    ],
  }

  handleDeleteFile = (fileKey) => {
    this.setState(state => {
      const newFiles = []
      state.files.forEach((file) => {
        if (file.key !== fileKey) {
          newFiles.push(file)
        }
      })
      state.files = newFiles
      return state
    })
  }

  render() {
    return (
      <div id="parentContainer">
        <div id="mainContainer">
          <h1 style={{fontSize: "3em"}}>DropBucket</h1>
          <FileBrowser
            files={this.state.files}
            icons={Icons.FontAwesome(4)}
            onDeleteFile={this.handleDeleteFile}
          />
        </div>
      </div>
    )
  }
}

export default App;