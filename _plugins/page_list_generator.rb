module Jekyll

  class Post
    attr_accessor :name

    def full_path_to_source
      File.join(@base, @name)
    end
    
    def path_to_source
      File.join(@name)
    end

    def location_on_server(my_url)
      "#{my_url}#{url}"
    end
  end

  class Page
    attr_accessor :name

    def full_path_to_source
      File.join(@base, @dir, @name)
    end
    
    def path_to_source
      File.join(@dir, @name)
    end

    def location_on_server(my_url)
      location = "#{my_url}#{url}"
      location.gsub(/index.html$/, "")
    end
  end


  class Layout
    def full_path_to_source
      File.join(@base, @name)
    end
  end

  # Recover from strange exception when starting server without --auto
  class SitemapFile < StaticFile
    require 'set'

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

    # Config defaults
    DIR = 'data'
    POST_LIST_FILENAME = 'post.list.json'
    

    # Goes through pages and posts and generates sitemap.xml file
    #
    # Returns nothing
    def generate(site)
      dir = File.join(site.dest, DIR)
      filename = POST_LIST_FILENAME

      # Create destination directory if it doesn't exist yet. Otherwise, we cannot write our file there.
      Dir::mkdir(dir) if !File.directory? dir

      # File I/O: create sitemap.xml file and write out pretty-printed XML
     
      file = File.open(File.join(dir, filename), "w")

      file.puts('hello data')
      file.close

      # Keep the sitemap.xml file from being cleaned by Jekyll
      site.static_files << Jekyll::SitemapFile.new(site, dir, '/', filename)
    end



    

    
    # Is the page or post listed as something we want to exclude?
    #
    # Returns boolean
    def excluded?(site, name)
      @config['exclude'].include? name
    end

    def posts_included?(site, name)
      @config['include_posts'].include? name
    end

    # Is the change frequency value provided valid according to the spec
    #
    # Returns boolean
    def valid_change_frequency?(change_frequency)
      VALID_CHANGE_FREQUENCY_VALUES.include? change_frequency
    end

    # Is the priority value provided valid according to the spec
    #
    # Returns boolean
    def valid_priority?(priority)
      begin
        priority_val = Float(priority)
        return true if priority_val >= 0.0 and priority_val <= 1.0
      rescue ArgumentError
      end

      false
    end
  end
end