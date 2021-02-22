class AddIndexToEnrollments < ActiveRecord::Migration[5.1]
  def change
    #student_id is not unique
    #course_id is not unique
    #[student_id, course_id] is unique

    add_index :enrollments, [:student_id, :course_id], {unique: true}
    # add_index :enrollments, :course_id, {unique: true}
    
  end
end
