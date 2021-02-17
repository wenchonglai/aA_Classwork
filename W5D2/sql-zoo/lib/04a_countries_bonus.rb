# == Schema Information
#
# Table name: countries
#
#  name        :string       not null, primary key
#  continent   :string
#  area        :integer
#  population  :integer
#  gdp         :integer

require_relative './sqlzoo.rb'

def highest_gdp
  # Which countries have a GDP greater than every country in Europe? (Give the
  # name only. Some countries may have NULL gdp values)
  execute(<<-SQL)
    SELECT
      name
    FROM
      countries
    WHERE
      gdp > (SELECT max(gdp) FROM countries WHERE continent = 'Europe')
  SQL
end

def largest_in_continent
  # Find the largest country (by area) in each continent. Show the continent,
  # name, and area.
  execute(<<-SQL)
    select
      countries.continent, countries.name, countries.area
    from
      countries
    where
      countries.area >= (
        select max(c.area)
        from countries as c
        where c.continent = countries.continent and c.name != countries.name
      )
  SQL
end

def large_neighbors
  # Some countries have populations more than three times that of any of their
  # neighbors (in the same continent). Give the countries and continents.
  execute(<<-SQL)
    select
      countries.name, countries.continent
    from
      countries
    where
      countries.population > 3 * (
        select
          max(c.population)
        from
          countries as c
        where
          countries.name != c.name and countries.continent = c.continent
      )
  SQL
end
