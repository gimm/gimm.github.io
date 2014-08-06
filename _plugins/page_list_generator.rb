module Jekyll

  class ListPage < Page
    def initialize(site, base, dir, list)
      @site = site
      @base = base
      @dir = dir
      @name = 'post.list.json'

      self.process(@name)
      self.read_yaml(File.join(base, '_layouts'), 'post.list.html')
      self.data['list'] = list

    end
  end

  class PageListGenerator < Generator
    safe true

    def generate(site)
      puts "Hello World!"
      site.posts.each do |post| 
        puts post.title
        puts post.date
        puts post.tags
        puts post.url
        puts post.excerpt 
      end
      site.pages << ListPage.new(site, site.source, 'data', 'list data')
    end
  end

end