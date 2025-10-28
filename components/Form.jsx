import Link from 'next/link';

const Form = ({
    type, post, setPost, submitting, handleSubmit, 
  }) => {
  
  const tagUpdate = () => {
    if (post.tag && !post.tags.includes(post.tag)){
    setPost((p) => ({...p, tag:p.tag.replace('#', '').replaceAll(' ', '')}));
    setPost((p) => ({...p, tags: [...p.tags, p.tag], tag: ''}));
    } else {
      setPost((p) => ({...p, tag: ""}));
    }
    
  };
  
  return (
    <section className= "w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Post</span>
      </h1>
      <p className= "desc text-left max-w-md">
        {type} and share amazing prompts with the world, and let your imagination run wild with any AI-powered platform.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism">
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Your AI prompt
          </span>
          <textarea
            value={post.prompt}
            onChange={(e) => setPost({...post, prompt: e.target.value})}
            placeholder="Write your prompt here ..."
            required
            className="form_textarea border-primary-orange border-1"/>
        </label>
        
        <div className = 'flex gap-1'>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700"> 
              Tags: 
          </span>
          </label>
          {
              (
                <div className="flex gap-1 flex-wrap">               
                 {post.tags.map(
                  (element) => (
                  <button className="bg-blue-500 rounded-full px-1.5 text-white" 
                    key={element.toLowerCase()}
                    type="button"
                    onClick = {() => setPost((p) => 
                    ({...p, tags: p.tags.filter((e) => e != element)}
                    ))}>
                       {`#${element}`}     
                    </button>
                  )
                )}
                </div>
              )}
          </div>
          
          <input
            value={post.tag}
            placeholder="Do not add # at the beginning"
            className="form_input border-primary-orange border-1"
            onChange = {(e) => setPost({...post, tag: e.target.value})}
            />
            <button 
              onClick = {tagUpdate}
              type="button"
              className="bg-primary-orange rounded-full  text-white w-fit px-3">
              add tag
            </button>
        
        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className='text-gray-500 text-sm'>
            Cancel
          </Link>
          <button
            type = "submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm 
            bg-primary-orange rounded-full text-white">
            {submitting ?  `${type}...` : type}

          </button>
        </div>
      </form>
    </section>
  )
}

export default Form;