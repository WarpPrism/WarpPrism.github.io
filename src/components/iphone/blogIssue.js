import React from 'react'
import StateBar from 'components/iphone/stateBar.js';
import SearchBar from 'components/iphone/searchBar.js';
require('styles/blogIssue.css');

import {Spin} from 'antd';

class BlogIssue extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allIssues: [],
            issues: [],
            loading: true
        };
        this.searchIssues = this.searchIssues.bind(this);
    }
    componentDidMount() {
        // 请求GitHub Blog Repo下的所有issues 即博客文章
        this.request = $.ajax({
            url: 'https://api.github.com/repos/WarpPrism/Blog/issues',
            type: 'GET',
            success: (data) => {
                this.setState({
                    allIssues: data,
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
                <StateBar theme='dark'/>
                <div className='app-top-bar'>
                    <div className='return-btn' onClick={this.goBack}></div>
                    <div className='search-btn' onClick={this.toggleSearchBar}></div>
                    <div className='app-title'>文章列表</div>
                </div>
                
                <div className='slide-part'>
                    {/*<Loader loading={this.state.loading}/>*/}
                    <SearchBar handler={this.searchIssues}/>    
                    <Spin className='issue-loader flex' spinning={this.state.loading} tip='Loading...' size='large'></Spin>                                        
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
                        {(this.state.issues.length <= 0 && !this.state.loading)?<li className='article-list-item'><a href='javascript:void(0)'>暂无文章</a></li>:null}
                    </ul>
                </div>
            </div>
        );
    }
    goBack(e) {
        history.back();
    }
    toggleSearchBar(e) {
        var sp = $('.slide-part');
        if (sp.scrollTop() != 0) {
            sp.scrollTop(0);
            $('.search-bar').slideDown('fast');
        } else if(sp.scrollTop() == 0){
            $('.search-bar').slideToggle('fast');            
        }
    }
    searchIssues(e) {
        var input = $(e.target).parents('.search-bar').find('.search-input');
        var s = input.val();
        if (s == '') {
            this.setState({
                issues: this.state.allIssues
            });
            return;
        }
        var pattern = new RegExp(s, 'gi');
        var found = this.state.allIssues.filter((item, index) => {
            return pattern.test(item.title);
        });
        this.setState({
            issues: found
        });
    }
}

export default BlogIssue;