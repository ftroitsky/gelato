import React from 'react'

import { createUseStyles } from 'react-jss'
import PropTypes from 'prop-types'
import { IconAntenna } from '../Icons'

const styles = createUseStyles({
  root: {
    textAlign: 'center',
    width: 50
  },
  img: {
    display: 'none'
  },
  imgLoaded: {
    display: 'block'
  },
  loader: {
    display: 'inline-block',
    width: 50,
    height: 50,
    background: '#ccc'
  },
  svg: {
    display: 'inline-block',
    width: 40,
    height: 40
  },
  a: {
    fill: '#848484',
    fillRule: 'evenodd'
  },
  b: {
    fill: '#211d1e'
  }
})

class ImgLoader extends React.PureComponent {
  static propTypes = {
    operatorId: PropTypes.string
  }

  static defaultProps = {
    operatorId: ''
  }

  state = {
    imgLoaded: false,
    noImg: false
  }

  handleImageLoaded = () => {
    this.setState({ imgLoaded: true })
  }

  handleImageError = () => {
    this.setState({ noImg: true })
  }

  render () {
    const { operatorId } = this.props
    const { imgLoaded, noImg } = this.state
    const classes = styles()
    return (
      <div className={classes.root}>
        <img
          onLoad={this.handleImageLoaded.bind(this)}
          onError={this.handleImageError.bind(this)}
          src={`https://cdn.esim.ninja/operators/${operatorId}.png`}
          alt={operatorId}
          height={50}
          width={50}
          className={`${classes.img} ${imgLoaded ? classes.imgLoaded : ''}`}
        />
        {noImg && (
          /* eslint-disable-next-line max-len */
          <IconAntenna color="#ccc" className={classes.svg} />
        )}
        {!imgLoaded && !noImg && (
          /* eslint-disable-next-line max-len */
          <div className={classes.loader} />
        )}
      </div>
    )
  }
}

export default ImgLoader
