import React, { useEffect, useState } from 'react'
import { type NativeSyntheticEvent, Platform, TextInput, type TextInputContentSizeChangeEventData } from 'react-native'

export const TextAreaResizable = () => {
  const textareaLineHeight = 18

  const [value, setValue] = useState('')
  const [rows, setRows] = useState(2)
  // const [minRows, setMinRows] = useState(2)
  // const [maxRows, setMaxRows] = useState(10)
  const minRows = 2
  const maxRows = 10
  const [minHeight, setMinHeight] = useState(2 * textareaLineHeight)

  const handleChange = (event: any) => {
    if (Platform.OS === 'web') {
      const previousRows = event.target.rows
      event.target.rows = minRows

      const currentRows = ~~(event.target.scrollHeight / textareaLineHeight)

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
        ? Math.floor(e.nativeEvent.contentSize.height / textareaLineHeight)
        : Math.ceil(e.nativeEvent.contentSize.height / textareaLineHeight)

    if (currentRows !== rows) {
      if (currentRows <= minRows) {
        return setRows(minRows)
      }
      if (currentRows >= maxRows) {
        return setRows(maxRows)
      }
      setRows(e.nativeEvent.contentSize.height / textareaLineHeight)
    }
  }

  useEffect(() => {
    setMinHeight(rows * textareaLineHeight)
  }, [rows])

  return (
    <TextInput
      style={{
        borderWidth: 2,
        borderColor: 'pink',
        marginTop: 50,
        padding: 4,
        minHeight
      }}
      multiline={true}
      numberOfLines={Platform.OS === 'web' ? Math.floor(rows) : Math.ceil(rows)}
      value={value}
      placeholder={'Enter your text here...'}
      textAlignVertical="top"
      onChange={handleChange}
      onContentSizeChange={handleContentSizeChange}
    />
  )
}

export default TextAreaResizable
