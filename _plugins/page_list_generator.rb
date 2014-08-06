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

    def generate(site)
      site.pages << ListPage.new(site, site.source, 'data', 'list data')
    end
  end

end