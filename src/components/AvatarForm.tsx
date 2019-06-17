import * as React from 'react'
import { AvatarStyle, Option, OptionContext } from 'avataaars'
import {
  Button,
  Col,
  ControlLabel,
  Form,
  FormControl,
  FormGroup
} from 'react-bootstrap'

export interface Props {
  avatarStyle: AvatarStyle
  optionContext: OptionContext
  displayingCode: boolean
  displayingImg: boolean
  onDownloadPNG?: () => void
  onDownloadSVG?: () => void
  onAvatarStyleChange?: (avatarStyle: AvatarStyle) => void
  onToggleCode?: () => void
  onToggleImg?: () => void
}

export default class AvatarForm extends React.Component<Props> {

  componentWillMount () {
    const { optionContext } = this.props
    optionContext.addStateChangeListener(() => {
      this.forceUpdate()
    })
  }

  render () {
    const { optionContext, avatarStyle, displayingImg, displayingCode } = this.props;
    const selects = optionContext.options.map((option, index) => {
      const optionState = optionContext.getOptionState(option.key)!
      if (optionState.available <= 0) {
        return null
      }
      //these are the left / right arrows for each available option
      return (
        <div>
          <div className="selektor selektor-left" id={'left-' + option.key} onClick={(e) => this.changeLeft(e, option)}>LEFT</div>
          <div className="selektor selektor-right" id={'right-'+option.key} onClick={(e) => this.changeRight(e, option)}>RIGHT</div>
        </div>
      )
    })
    const labelCol = 3
    const inputCol = 9
    return (
      <Form horizontal>
        <FormGroup className='row' controlId='avatar-style'>
          <Col componentClass={ControlLabel} sm={3}>
            Avatar Style
          </Col>
          <Col sm={9}>
            <label>
              <input
                type='radio'
                id='avatar-style-circle'
                name='avatar-style'
                value={AvatarStyle.Circle}
                checked={avatarStyle === AvatarStyle.Circle}
                onChange={this.onAvatarStyleChange}
              />{' '}
              Circle
            </label>{' '}
            <label>
              <input
                type='radio'
                id='avatar-style-transparent'
                name='avatar-style'
                value={AvatarStyle.Transparent}
                checked={avatarStyle === AvatarStyle.Transparent}
                onChange={this.onAvatarStyleChange}
              />{' '}
              Transparent
            </label>
          </Col>
        </FormGroup>
        {selects}
        <FormGroup className='row'>
          <Col
            className={'offset-sm-' + labelCol}
            smOffset={labelCol}
            sm={inputCol}>
            <Button
              bsStyle='primary'
              type='submit'
              onClick={this.onDownloadPNG}>
              <i className='fa fa-download' /> PNG
            </Button>{' '}
            <Button
              bsStyle='secondary'
              type='submit'
              onClick={this.onDownloadSVG}>
              <i className='fa fa-download' /> SVG
            </Button>{' '}
            <Button
              bsStyle='secondary'
              type='submit'
              onClick={this.onToggleCode}>
              <i className='fa fa-code' />{' '}
              {displayingCode ? 'Hide React' : 'Show React'}
            </Button>{' '}
            <Button
              bsStyle='secondary'
              type='submit'
              onClick={this.onToggleImg}>
              <i className='fa fa-code' />{' '}
              {displayingImg ? 'Hide <img>' : 'Show <img>'}
            </Button>
          </Col>
        </FormGroup>
      </Form>
    )
  }

  private changeRight(e: any, avatarOption: Option) {
    const { optionContext} = this.props;

    const optionState = optionContext.getOptionState(avatarOption.key)!;
    if (optionState.available <= 0) {
      return
    }

    let newIndex = -1
    let currentValue = optionContext.getValue(avatarOption.key);

    //get index of current value & increase by 1
    optionState.options.forEach((selOption, index) => {
      if (selOption == currentValue) {
        newIndex = index + 1
      }
    });

    let newOption = optionState.options[newIndex] || optionState.options[0]
    if (newOption) {
      this.onChange(avatarOption, newOption)
    }
  }

  private changeLeft(e: any, avatarOption: Option) {
    const { optionContext} = this.props;

    const optionState = optionContext.getOptionState(avatarOption.key)!;
    if (optionState.available <= 0) {
      return
    }

    let newIndex = -1
    let currentValue = optionContext.getValue(avatarOption.key);

    //get index of current value & increase by 1
    optionState.options.forEach((selOption, index) => {
      if (selOption == currentValue) {
        newIndex = index - 1
      }
    });

    let newOption = optionState.options[newIndex] || optionState.options[optionState.options.length - 1]
    if (newOption) {
      this.onChange(avatarOption, newOption)
    }
  }

  private onChange (option: Option, value: string) {
    const { optionContext } = this.props
    optionContext.setValue(option.key, value)
  }

  private onAvatarStyleChange = (event: React.FormEvent<HTMLInputElement>) => {
    if (this.props.onAvatarStyleChange) {
      this.props.onAvatarStyleChange((event.target as any).value)
    }
  }

  private onDownloadPNG = (event: React.FormEvent<FormControl>) => {
    event.preventDefault()
    if (this.props.onDownloadPNG) {
      this.props.onDownloadPNG()
    }
  }

  private onDownloadSVG = (event: React.FormEvent<FormControl>) => {
    event.preventDefault()
    if (this.props.onDownloadSVG) {
      this.props.onDownloadSVG()
    }
  }

  private onToggleCode = (event: React.FormEvent<FormControl>) => {
    event.preventDefault()
    if (this.props.onToggleCode) {
      this.props.onToggleCode()
    }
  }

  private onToggleImg = (event: React.FormEvent<FormControl>) => {
    event.preventDefault()
    if (this.props.onToggleImg) {
      this.props.onToggleImg()
    }
  }
}
