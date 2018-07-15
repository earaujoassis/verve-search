require 'rufus-scheduler'

module JobsService
  class << self
    def scheduler
      @scheduler ||= begin
        Rufus::Scheduler.new
      end
    end

    def every(duration, &block)
      scheduler.every(duration=duration, block=block)
    end
  end
end