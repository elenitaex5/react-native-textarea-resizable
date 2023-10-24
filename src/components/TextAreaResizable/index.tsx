import React, { useEffect, useState } from 'react'
import {
  type NativeSyntheticEvent,
  Platform,
  TextInput,
  type TextInputContentSizeChangeEventData,
  type TextInputProps,
  type TextStyle
} from 'react-native'

const TEXTAREA_LINE_HEIGHT = 18

export interface TextAreaResizableProps extends TextInputProps {
  minRows?: number
  maxRows?: number
  disabled?: boolean
}

export const TextAreaResizable = (props: TextAreaResizableProps) => {
  const { minRows = 1, maxRows = 6, disabled = false } = props

  const [value, setValue] = useState('')
  const [rows, setRows] = useState(2)
  const [minHeight, setMinHeight] = useState(2 * TEXTAREA_LINE_HEIGHT)

  const handleChange = (event: any) => {
    if (Platform.OS === 'web') {
      const previousRows = event.target.rows
      event.target.rows = minRows

      const currentRows = ~~(event.target.scrollHeight / TEXTAREA_LINE_HEIGHT)

      if (currentRows === previousRows) {
        event.target.rows = currentRows
      }

      if (currentRows >= maxRows) {
        event.target.rows = maxRows
        event.target.scrollTop = event.target.scrollHeight
      }

      setValue(event.target.value)
      setRows(currentRows < maxRows ? currentRows : maxRows)
    }

    if (Platform.OS !== 'web') {
      if (rows >= maxRows) {
        event.target.scrollTop = event.target.scrollHeight
      }
      setValue(event.target.value)
    }
  }

  const handleContentSizeChange = (e: NativeSyntheticEvent<TextInputContentSizeChangeEventData>) => {
    const currentRows =
      Platform.OS === 'web'
        ? Math.floor(e.nativeEvent.contentSize.height / TEXTAREA_LINE_HEIGHT)
        : Math.ceil(e.nativeEvent.contentSize.height / TEXTAREA_LINE_HEIGHT)

    if (currentRows !== rows) {
      if (currentRows <= minRows) {
        return setRows(minRows)
      }
      if (currentRows >= maxRows) {
        return setRows(maxRows)
      }
      setRows(e.nativeEvent.contentSize.height / TEXTAREA_LINE_HEIGHT)
    }
  }

  useEffect(() => {
    const style = props.style as TextStyle
    if (style?.minHeight && typeof style?.minHeight === 'number' && style.minHeight > rows * TEXTAREA_LINE_HEIGHT) {
      return setMinHeight(style.minHeight)
    }

    setMinHeight(rows * TEXTAREA_LINE_HEIGHT)
  }, [rows])

  const disabledCursor = disabled ? { cursor: 'not-allowed' } : {}
  const removingOutline = Platform.OS === 'web' ? { outlineWidth: 0 } : {}

  return (
    <TextInput
      {...props}
      style={{
        ...(props.style as Object),
        padding: 4,
        minHeight,
        ...removingOutline,
        ...disabledCursor
      }}
      multiline={true}
      numberOfLines={Platform.OS === 'web' ? Math.floor(rows) : Math.ceil(rows)}
      value={value}
      placeholder={props.placeholder}
      textAlignVertical="top"
      onChange={handleChange}
      onContentSizeChange={handleContentSizeChange}
      editable={props.editable ?? !disabled}
      placeholderTextColor={props?.placeholderTextColor ?? 'lightgray'}
    />
  )
}

export default TextAreaResizable
