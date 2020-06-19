import React from 'react'
import PropTypes from 'prop-types'
import FilesPage from './FilesPage'
import { apiEndpoint } from '../config.js'

const Actions = (props) => {
  const {
    selectedItems,
    icons,
  } = props

  let uploadFile = async (event) => {
    let element = event.target
    let fileKeyUser = element.value.split('\\').pop().split('/').pop()
    let fileKeyEncoded = encodeURIComponent(fileKeyUser)
    let payload = {fileKeyEncoded}
    let file = element.files[0]
    let mimeType = file.type

    const { uploadUrl } = await fetch(`${apiEndpoint}/files/upload`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${FilesPage.instance.state.token}`
      },
      body: JSON.stringify(payload)
    }).then(r => r.json())
    console.log(uploadUrl)

    await fetch(uploadUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': mimeType,
      },
      body: file
    })
  }
  
  let downloadFile = (event) => {
    event.preventDefault()
    alert(`File ${selectedItems[0].key} downloaded`)
  }
  
  let deleteFile = (event) => {
    event.preventDefault()
    alert(`File ${selectedItems[0].key} deleted`)
  }

  let actions = []
  if (FilesPage.instance.props.user) {
    actions.push(
      <li key="action-upload">
        <input id="file-upload" type="file" onChange={uploadFile} />
        <label htmlFor="file-upload" id="custom-file-upload">
          <i className="fa fa-upload" aria-hidden="true"></i>
          &nbsp;Upload&nbsp;
        </label>
      </li>
    )
  }

  if (selectedItems.length) {
    actions.push(
      <li key="action-download">
        <a
          onClick={downloadFile}
          href="/#"
          role="button"
        >
          {icons.Download}
          &nbsp;Download&nbsp;
        </a>
      </li>
    )

    actions.push(
      <li key="action-delete">
        <a
          onClick={deleteFile}
          href="/#"
          role="button"
        >
          {icons.Delete}
          &nbsp;Delete&nbsp;
        </a>
      </li>
    )
  }

  actions = (<ul className="item-actions">{actions}</ul>)
  return actions
}

Actions.propTypes = {
  selectedItems: PropTypes.arrayOf(PropTypes.object),
  icons: PropTypes.object,
}

Actions.defaultProps = {
  selectedItems: [],
  icons: {},
}

export default Actions