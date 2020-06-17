import React from 'react'
import PropTypes from 'prop-types'
import App from './App'

const Actions = (props) => {
  const {
    selectedItems,
    icons,
  } = props

  let uploadFile = async (event) => {
    event.preventDefault()
    alert(`File uploaded`)
    console.log(App.instance.state)
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
  actions.push(
    <li>
      <a
        onClick={uploadFile}
        href="#"
        role="button"
      >
        <i class="fa fa-upload" aria-hidden="true"></i>
        &nbsp;Upload&nbsp;
      </a>
    </li>
  )

  if (selectedItems.length) {
    actions.push(
      <li>
        <a
          onClick={downloadFile}
          href="#"
          role="button"
        >
          {icons.Download}
          &nbsp;Download&nbsp;
        </a>
      </li>
    )

    actions.push(
      <li>
        <a
          onClick={deleteFile}
          href="#"
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