import { Enlarge, TrashBin } from '@amsterdam/asc-assets'
import { useCallback, useEffect, useState } from 'react'

import { useController } from 'react-hook-form'

import type { Control, UseFormTrigger } from 'react-hook-form'
import type { FunctionComponent } from 'react'
import type { FieldWrapperProps } from 'components/FieldWrapper'
import type { FormData } from 'components/IncidentForm/Step1'

import type { IncidentState } from 'app/store/slices/incident/reducer'

import FileInputStyle, {
  AddButton,
  AddIcon,
  DeleteButton,
  FileInputEmptyBox,
  FileInputPreviewBox,
  FileInputUploadButton,
  FilePreview,
  ScreenReaderOnly,
} from './styles'

import FieldWrapper from 'components/FieldWrapper'
import fileSize from 'services/file-size'

const MIN = 30 * 2 ** 10 // 30 KiB
const MAX = 20 * 2 ** 20 // 20 MiB
const MAX_NUMBER_OF_FILES = 3
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif']
const ALLOWED_EXTENSIONS = ALLOWED_FILE_TYPES.map((type) => type.split('/')[1])

interface FileInputProps extends FieldWrapperProps {
  control: Control<FormData>
  name: keyof FormData
  files?: IncidentState['files']
  trigger: UseFormTrigger<FormData>
}

const fromBlobToURL = (files: Array<Blob | File>) => files.map(window.URL.createObjectURL)
const fromURLToBlob = async (files: string[]) =>
  Promise.all(
    files.map((fileURL) =>
      fetch(fileURL, {
        headers: {
          'Content-type': 'application/blob',
        },
      }).then((response) => response.blob())
    )
  )

const FileInput: FunctionComponent<FileInputProps> = ({
  control,
  error = '',
  hint,
  label,
  name,
  files = [],
  trigger,
}) => {
  const [previews, setPreviews] = useState(files)
  const [emptySlots, setEmptySlots] = useState([])
  const { field } = useController({
    control,
    name,
    rules: {
      validate: {
        fileType: (files?: File[]) => {
          const notSupported = files?.find((file) => !ALLOWED_FILE_TYPES.includes(file.type))
          if (notSupported) {
            return `Het type van bestand '${
              notSupported.name
            }' wordt niet ondersteund. Toegestaan zijn: ${ALLOWED_EXTENSIONS.join(', ')}`
          }
        },
        numberOfFiles: (files?: File[]) => {
          if (files?.length > MAX_NUMBER_OF_FILES) return `U kunt maximaal ${MAX_NUMBER_OF_FILES} bestanden uploaden`
        },
        minFileSize: (files?: File[]) => {
          const tooSmall = files?.find((file) => file.size < MIN)

          if (tooSmall) {
            return `Het bestand '${tooSmall.name}' is te klein. De minimale bestandgrootte is ${fileSize(MIN)}.`
          }
        },

        maxFileSize: (files?: File[]) => {
          const tooBig = files?.find((file) => file.size > MAX)

          if (tooBig) {
            return `Het bestand '${tooBig.name}' is te groot. De maximale bestandgrootte is ${fileSize(MAX)}.`
          }
        },
      },
    },
  })

  const addFiles = useCallback(
    async (event) => {
      const newFiles = [...event.target.files].slice(0, MAX_NUMBER_OF_FILES - previews.length)
      const currentFiles = await fromURLToBlob(previews)
      const allFiles = [...currentFiles, ...newFiles]

      field.onChange(allFiles)

      const isValid = await trigger(name)

      if (isValid) {
        const objectURLs = fromBlobToURL(allFiles)
        setPreviews(objectURLs)
      }
    },
    [field, name, trigger, previews]
  )

  const removeFile = useCallback(
    async (index: number) => {
      window.URL.revokeObjectURL(previews[index])

      const remainingFiles = await fromURLToBlob(previews.filter((_file, fileIndex) => fileIndex !== index))

      field.onChange(remainingFiles)

      await trigger(name)

      setPreviews(fromBlobToURL(remainingFiles))
    },
    [field, previews, name, trigger]
  )

  useEffect(() => {
    const slotsRemaining = MAX_NUMBER_OF_FILES - previews.length - 1
    const empty = slotsRemaining < 0 ? [] : Array.from(Array(slotsRemaining).keys())

    setEmptySlots(empty)
  }, [previews.length])

  return (
    <FieldWrapper hint={hint} label={label} error={error} id={name}>
      <FileInputStyle id={name} data-testid="fileInput" aria-describedby={hint && `subtitle-${name}`}>
        {previews.map((preview, index) => (
          <FileInputPreviewBox key={`${preview}-${index}`} data-testid="fileInputPreviewBox">
            <FilePreview preview={preview}>
              <DeleteButton
                aria-label={`Verwijder foto ${index + 1}`}
                data-testid="deleteFotoButton"
                icon={<TrashBin />}
                onClick={() => removeFile(index)}
                type="button"
                variant="blank"
                value={files}
              />
            </FilePreview>
          </FileInputPreviewBox>
        ))}

        {previews.length < MAX_NUMBER_OF_FILES && (
          <FileInputUploadButton data-testid="fileInputUploadButton">
            <input
              accept={ALLOWED_FILE_TYPES.join(',')}
              aria-label="Toevoegen foto"
              data-testid="fileInputUpload"
              id="fileUpload"
              multiple
              name={field.name}
              onChange={addFiles}
              ref={field.ref}
              type="file"
            />

            <label htmlFor="fileUpload">
              <AddButton as="span">
                <ScreenReaderOnly>Toevoegen foto</ScreenReaderOnly>

                <AddIcon size={22}>
                  <Enlarge />
                </AddIcon>
              </AddButton>
            </label>
          </FileInputUploadButton>
        )}

        {emptySlots.map((key) => (
          <FileInputEmptyBox data-testid="fileInputEmptyBox" key={key} />
        ))}
      </FileInputStyle>
    </FieldWrapper>
  )
}

export default FileInput
