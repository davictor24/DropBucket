import React from 'react'
import PropTypes from 'prop-types'
import FilesPage from './FilesPage'

const Actions = (props) => {
  const {
    selectedItems,
    icons,
  } = props

  let uploadFile = async (event) => {
    event.preventDefault()
    alert(`File uploaded`)
    console.log(FilesPage.instance.state)
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
        <a
          onClick={uploadFile}
          href="/#"
          role="button"
        >
          <i className="fa fa-upload" aria-hidden="true"></i>
          &nbsp;Upload&nbsp;
        </a>
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