module Jekyll

  # Recover from strange exception when starting server without --auto
  class SitemapFile < StaticFile
    
    def destination(dest)
      File.join(@base, @dir, @name)
    end

    def modified?
      return false
    end

    def write(dest)
      return true
    end
  end

  class SitemapGenerator < Generator
    safe true
    # Config defaults
    DIR = '/'
    POST_LIST_FILENAME = 'data.html'
    

    # Goes through pages and posts and generates sitemap.xml file
    #
    # Returns nothing
    def generate(site)
      dir = File.join(site.dest, DIR)
      filename = POST_LIST_FILENAME

      # Create destination directory if it doesn't exist yet. Otherwise, we cannot write our file there.
      Dir::mkdir(dir) if !File.directory? dir

      # File I/O: create sitemap.xml file and write out pretty-printed XML
     
      # file = File.new(File.join(dir, filename), "w")
      # file.write('hello wwww')
      # file.close

      File.open(File.join(dir, filename), 'w') do |file|
          file.write('my file')
      end 

      # Keep the sitemap.xml file from being cleaned by Jekyll
      site.static_files << Jekyll::SitemapFile.new(site, dir, '/', filename)
    end

  end
end