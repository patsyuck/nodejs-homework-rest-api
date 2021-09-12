const fs = require('fs/promises')
const path = require('path')

const uploadDir = path.join(__dirname, '../../', 'public/avatars')

const updateImage = async (req, res) => {
  const { id } = req.params
  const uploadPath = path.join(uploadDir, id)
  const uploadFolder = await fs.mkdir(uploadPath)
  const { path: tempPath, originalname } = req.file
  const newPath = ''
  try {
    await fs.rename(uploadFolder, newPath)
  } catch (error) {
    await fs.unlink(uploadFolder)
    throw error
  }
}

module.exports = updateImage
