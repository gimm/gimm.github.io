require 'fileutils'

module Jekyll
  class JekyllJson < Jekyll::Generator
    safe true
    priority = :low
    
    FILENAME = "data.txt"
    # Main plugin action, called by Jekyll-core
    def generate(site)
      @site = site
      unless data_exists?
        write
        @site.keep_files ||= []
        @site.keep_files << FILENAME
      end
    end


    # Path to sitemap.xml template file
    def source_path
      File.expand_path FILENAME, File.dirname(__FILE__)
    end

    # Destination for sitemap.xml file within the site source directory
    def destination_path
      File.expand_path FILENAME, @site.dest
    end

    # copy sitemap template from source to destination
    def write
      FileUtils.mkdir_p File.dirname(destination_path)
      File.open(destination_path, 'w') { |f| f.write(sitemap_content) }
    end

    def sitemap_content
      data = Page.new(@site, File.dirname(__FILE__), "", FILENAME)
      data.content = File.read(source_path)
      data.data["layout"] = nil
      data.render(Hash.new, @site.site_payload)
      data.output
    end

    # Checks if a sitemap already exists in the site source
    def data_exists?
      File.exists? File.expand_path FILENAME, @site.source
    end
  end
end
