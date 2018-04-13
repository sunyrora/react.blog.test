import React from 'react';
import './styles/Blog.css';
import marked from 'marked';

marked.setOptions({
  gfm: true,
  breaks: true
})

class Blog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      review: null,
    };

    this.refEditor = React.createRef();
    this.refReview = React.createRef();
  }

  createMarkup(val) {
    return { __html: val };
  }

  handleChange (e) {
    const parsed = marked(e.target.value);
    const converted = this.createMarkup(parsed);
    this.setState({
      text: e.target.value,
      review: converted
    });
  }


  render() {
    return (
      <div className="container">
        <textarea
          className="editor"
          placeholder='Write down your message'
          name='text'
          value={this.state.text}
          onChange={(e) => this.handleChange(e) }
          ref={this.refEditor}
          tabIndex='1'
        />
        <div 
          className="review"
          ref={this.refReview}
          dangerouslySetInnerHTML={this.state.review}
        />
      </div>
    );
  }
}

export default Blog;