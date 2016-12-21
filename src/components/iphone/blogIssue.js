import React from 'react'
import Loader from 'components/common/Loader.js';
require('styles/blogIssue.css');

class BlogIssue extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            issues: [],
            loading: true
        };
    }
    componentDidMount() {
        // 请求GitHub Blog Repo下的所有issues 即博客文章
        this.request = $.ajax({
            url: 'https://api.github.com/repos/WarpPrism/Blog/issues',
            type: 'GET',
            success: (data) => {
                this.setState({
                    issues: data,
                    loading: false
                });
            }
        });
    }
    componentWillUnmount() {
        this.request.abort();
    }
    render() {
        return (
            <div className='blog-issue'>
                <div className='app-top-bar'>
                    <div className='return-btn' onClick={this.goBack}></div>
                    <div className='search-btn'></div>
                    <div className='app-title'>文章列表</div>
                </div>
                <div className='slide-part'>
                    <Loader loading={this.state.loading}/>      
                    <ul className='article-list'>
                        {
                            this.state.issues.map((item, index) => {
                                if (item.state == 'open') {
                                    return (
                                        <li className='article-list-item' key={index}>
                                            <a href={item.html_url} target='_blank'>
                                                <span>{index + 1}.&nbsp;</span>{item.title}
                                            </a>
                                        </li>                        
                                    );
                                } else {
                                    return null;
                                }
                            })
                        }
                    </ul>
                </div>
            </div>
        );
    }
    goBack(e) {
        history.back();
    }
}

export default BlogIssue;