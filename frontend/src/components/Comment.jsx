import React from 'react'

const Comment = ({comment, threadAuthor}) => {

  const renderFile = () => {
    if (!comment.file) return null;

    const isImage = comment.file.match(/\.(jpeg|jpg|png|gif)$/i);

    if (isImage) {
      return <img src={comment.file} width={400} alt="Comment Attachment" className="h-auto rounded-lg mt-2" />;
    }

    return null;
  };

  return (
    <div className="border-t border-gray-200 pt-2">
      <p className="text-gray-800 text-sm">
        <span className={`font-medium ${threadAuthor === comment.author._id ? 'text-red-400' : ''}`}>{comment.author.name}</span>: {comment.text}
      </p>
      {renderFile()}
    </div>
  )
}

export default Comment