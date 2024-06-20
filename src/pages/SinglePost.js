import React from "react"
import {useMemo} from 'react'
import {Link, useParams} from 'react-router-dom'

const SinglePost = ({posts}) => {
  const params = useParams()

  const currentPost = useMemo(() => posts.find(post => post.id === parseInt(params.id)), [params.id, posts])

  return (
    <div>
      <h1>{currentPost.title}</h1>
      <h3>{currentPost.body}</h3>
      <Link to={`/edit/${params.id}`}>
        <button>Edit Blog</button>
      </Link>
      <Link to={`/`}>
        <button>Back</button>
      </Link>
    </div>
  )
}

export default SinglePost