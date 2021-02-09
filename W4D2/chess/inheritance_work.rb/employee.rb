class Employee

    attr_reader :name, :title, :salary, :boss
    def initialize(name, title, salary, boss=nil)
        @name = name
        @title = title
        @salary = salary
        @boss = nil
        self.boss = boss
    end

    def boss=(manager)
        @boss = manager
        manager.add_employee(self) unless manager.nil?
    end

    def bonus(multiplier)
        @salary*multiplier
    end


end

class Manager < Employee 

    def initialize(name, title, salary, boss=nil)
        @employees = []
        super
    end

    def add_employee(employee)
        @employees << employee
    end

    def bonus(multiplier)
        self.total_employee_salary*multiplier
    end

    def total_employee_salary
        @employees.inject(0) do |sum, employee|
        
            sum = sum + employee.salary
            sum += employee.total_employee_salary if employee.is_a?(Manager)
            sum
        end
    end
end


ned = Manager.new("Ned" , "Founder", 1000000)
darren = Manager.new("Darren", "Manager", 78000, ned)
shawna = Employee.new("Shawna", "TA", 12000, darren)
david = Employee.new("David", "TA", 10000, darren)

p ned.bonus(5)
p darren.bonus(3)
p david.bonus(3)
