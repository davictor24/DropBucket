import React from 'react'
import PropTypes from 'prop-types'
import FilesPage from './FilesPage'
import { uploadFile, downloadFile, deleteFile } from '../api/files-api.js'

const Actions = (props) => {
  const {
    selectedItems,
    icons,
  } = props

  let actions = []
  if (FilesPage.instance.props.user) {
    actions.push(
      <li key="action-upload">
        <input id="file-upload" type="file" onChange={async (event) => {
          await uploadFile(FilesPage.instance.state.token, event.target)
          FilesPage.instance.getUpdates()
        }} />
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
          onClick={async (event) => {
            event.preventDefault()
            await downloadFile(FilesPage.instance.state.token, selectedItems[0].key)
          }}
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
          onClick={async (event) => {
            event.preventDefault()
            await deleteFile(FilesPage.instance.state.token, selectedItems[0].key)
            FilesPage.instance.getUpdates()
          }}
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