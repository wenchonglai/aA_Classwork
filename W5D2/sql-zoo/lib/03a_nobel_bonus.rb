# == Schema Information
#
# Table name: nobels
#
#  yr          :integer
#  subject     :string
#  winner      :string

require_relative './sqlzoo.rb'

def physics_no_chemistry
  # In which years was the Physics prize awarded, but no Chemistry prize?
  execute(<<-SQL)
    SELECT
      DISTINCT nobels.yr
    FROM
      nobels
    WHERE
      subject = 'Physics' and nobels.yr not in (select n.yr from nobels as n where n.subject = 'Chemistry')
  SQL
end
