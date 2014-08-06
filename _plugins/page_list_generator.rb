require 'json'

module Jekyll

  class DataGenerator < Generator

    def generate(site)
      @site = site

      process_post_list
    end

    def process_post_list

            generate_aliases()
  
    end

    def generate_aliases()
        dir = File.join(@site.dest, 'data')
        puts File.join(dir ,'test.json')
        txt = File.open(File.join(dir ,'test.json'), 'w+')
        txt.puts("hello world")
        
        @site.static_files << Jekyll::JsonDataFile.new(@site, @site.dest, 'data' ,'test.json')

    end
  end

  class JsonDataFile < StaticFile
    require 'set'

    def destination(dest)
      File.join(dest, @dir, @name)
    end

    def modified?
      return false
    end

    def write(dest)
      return true
    end
  end
end