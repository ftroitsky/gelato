import React from 'react'

import { createUseStyles } from 'react-jss'
import PropTypes from 'prop-types'
import Fuse from 'fuse.js'
import { IconSearch } from '../Icons'

const fuseOptions = {
  shouldSort: true,
  threshold: 0,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: [
    'label'
  ]
}

const styles = createUseStyles({
  root: {
    margin: '20px 0',
    display: 'flex',
    alignItems: 'center'
  },
  wrapper: {
    display: 'inline-block',
    position: 'relative',
    margin: '0 0 0 10px'
  },
  input: {
    borderRadius: 5,
    border: '1px solid #dadce0',
    padding: '5px 10px 5px 28px',
    minWidth: 235,
    outline: 'none',
    fontFamily: 'Open Sans, sans-serif',
    fontSize: '16px'
  },
  inputActive: {
    position: 'relative',
    zIndex: 1001,
    borderColor: 'transparent',
    borderBottomColor: '#dadce0',
    borderRadius: 0
  },
  listContainer: {
    boxSizing: 'border-box',
    zIndex: 1000,
    background: '#fff',
    boxShadow: '0 0 7px rgba(0, 0, 0, .07)',
    position: 'absolute',
    top: 0,
    left: -5,
    right: -5,
    padding: '30px 0 0 0'
  },
  list: {
    padding: 0,
    maxHeight: 200,
    overflow: 'scroll',
    margin: 0,
    listStyle: 'none',
    '& > li': {
      padding: '5px 10px',
      cursor: 'pointer',
      transition: '.2s',
      display: 'block',
      '&:hover': {
        background: '#f9f8f8'
      }
    }
  },
  search: {
    position: 'absolute',
    zIndex: 1002,
    left: 8,
    top: 8,
    width: 14,
    height: 14
  },
  itemActive: {
    background: '#f9f8f8'
  }
})

export const withClasses = Component => (props) => {
  const classes = styles()
  return <Component classes={classes} {...props} />
}

class Select extends React.Component {
  static propTypes = {
    defValue: PropTypes.string,
    options: PropTypes.array.isRequired,
    label: PropTypes.string,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    classes: PropTypes.object.isRequired
  }

  static defaultProps = {
    label: '',
    onChange: () => {
    },
    placeholder: '',
    defValue: ''
  }

  constructor (props) {
    super(props)
    const {
      options
    } = this.props
    this.state = {
      isOpen: false,
      value: '',
      valueEmoji: '',
      showAllNames: true,
      defValueActive: true,
      highlighted: 0,
      optionsState: options
    }
  }

  componentDidMount () {
    this.scrollToSelected()
  }

  componentDidUpdate () {
    this.scrollToSelected()
  }

  onKeyPress = (e) => {
    if (e.keyCode === 13) {
      e.target.blur()
      const { highlighted } = this.state
      const filterOpt = this.filterOpt()
      const { label } = filterOpt[highlighted]
      const { value } = filterOpt[highlighted]
      const { labelEmoji } = filterOpt[highlighted]
      this.changeSelect(label, value, labelEmoji)
    }
  };

  onKeyDown = (e) => {
    if (e.keyCode === 40) {
      this.handleArrowDown()
      this.scrollToSelected()
    }

    if (e.keyCode === 38) {
      this.handleArrowUp()
      this.scrollToSelected()
    }
  }

  onKeyUp = (e) => {
    if (e.keyCode === 27) {
      e.target.blur()
      this.closeSelect()
    }
  }

  onFocus = () => {
    this.openSelect()
  }

  onBlur = () => {
    this.closeSelect()
  }

  handleChange = (e) => {
    this.setState({
      value: e.target.value,
      showAllNames: false,
      highlighted: 0
    })
  }

  changeSelect = (label, value, labelEmoji) => {
    const {
      onChange
    } = this.props
    onChange(value)
    this.setState({
      value: label,
      valueEmoji: labelEmoji,
      isOpen: false,
      showAllNames: true,
      highlighted: 0
    })
    this.closeSelect(labelEmoji)
  }

  scrollToSelected = () => {
    const {
      isOpen
    } = this.state
    if (isOpen) {
      const {
        classes
      } = this.props
      const item = this.selectOptions.querySelector(`.${classes.itemActive}`)
      if (item != null) {
        const listHeight = this.selectOptions.clientHeight
        const itemOffsetTop = item.offsetTop
        this.selectOptions.scrollTop = itemOffsetTop - listHeight / 2
      }
    }
  }

  handleArrowDown = () => {
    const { highlighted } = this.state
    const filterOpt = this.filterOpt().length - 1
    let highlightedUp = highlighted + 1
    if (highlightedUp > filterOpt) {
      highlightedUp = 0
    }
    this.setState({ highlighted: highlightedUp })
  }

  handleArrowUp = () => {
    const { highlighted } = this.state
    const filterOpt = this.filterOpt().length - 1
    let highlightedUp = highlighted - 1
    if (highlightedUp < 0) {
      highlightedUp = filterOpt
    }
    this.setState({ highlighted: highlightedUp })
  }

  openSelect = () => {
    this.setState({ value: '', isOpen: true, showAllNames: true })
  }

  closeSelect = (emoji) => {
    const { valueEmoji } = this.state
    const valueUseEmoji = emoji || valueEmoji
    this.setState({ value: valueUseEmoji, isOpen: false })
  }

  filterOpt = () => {
    const {
      optionsState,
      value,
      showAllNames
    } = this.state
    let result
    if (showAllNames || value.length === 0) {
      result = optionsState
    } else {
      const fuse = new Fuse(optionsState, fuseOptions)
      result = fuse.search(value)
    }
    return result
  }

  renderList = () => {
    const {
      highlighted
    } = this.state
    const {
      classes
    } = this.props
    const result = this.filterOpt()
    const list = result.map(option => (
      <li
        key={option.value + Math.random().toString(36).substring(7)}
        id={option.value}
        className={`${result[highlighted].value === option.value ? classes.itemActive : ''}`}
        onMouseDown={() => {
          this.changeSelect(option.label, option.value, option.labelEmoji)
        }}
      >
        {option.labelEmoji}
      </li>
    ))
    return list
  }

  render () {
    const {
      options,
      placeholder,
      label,
      defValue,
      classes
    } = this.props
    const {
      isOpen,
      value,
      defValueActive
    } = this.state
    const defValueIndex = options.map(e => e.value).indexOf(defValue)
    const defValueLabel = options[defValueIndex].labelEmoji
    if (defValueActive) {
      this.setState({
        value: defValueLabel,
        valueEmoji: options[defValueIndex].labelEmoji,
        defValueActive: false
      })
    }
    return (
      <div className={classes.root}>
        {/* eslint-disable-next-line jsx-a11y/label-has-for */}
        <label htmlFor="country-select">
          {label}
        </label>
        {' '}
        <div className={classes.wrapper}>
          <IconSearch className={classes.search} />
          <input
            name="country-select"
            type="text"
            autoComplete="off"
            placeholder={placeholder}
            value={value}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            onKeyDown={this.onKeyDown}
            onKeyPress={this.onKeyPress}
            onChange={this.handleChange}
            onKeyUp={this.onKeyUp}
            className={`${classes.input} ${isOpen ? classes.inputActive : ''}`}
          />
          {
            isOpen ? (
              <div className={classes.listContainer}>
                <ul ref={(selectOptions) => { this.selectOptions = selectOptions }} className={classes.list}>
                  {this.renderList()}
                </ul>
              </div>
            ) : null
          }
        </div>
      </div>
    )
  }
}

export default withClasses(Select)
