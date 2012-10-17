require 'spec_helper'

describe User do
	describe "Testing user model attribute" do
		before {@user = User.new(name: "Example", email: "test@test.com", password: "testtest",
			password_confirmation: "testtest")}
		subject {@user}

		it {should respond_to :name}
		it {should respond_to :email}
		it {should respond_to :photo_url}
		it {should respond_to :description}	
		it {should respond_to :encrypted_password}

		describe "Testing user name presence" do
			before { @user.name = " "}
			it {should_not be_valid}
		end

		describe "Testing email presence" do
			before { @user.email = " "}
			it {should_not be_valid}
		end

		describe "Testing email format" do
			before {@user = User.new(name: "Example", email: "test@test.com", password: "testtest",
				password_confirmation: "testtest")}
			subject {@user}

			it "should not have more than 1 @" do
				@user.email = "test@test@test"
				subject {should_not be_valid}
			end
			it "should not have 2 .. in domain name" do
				@user.email = "test@test..test"
				subject {should_not be_valid}
			end
			
			it "should not be valid without @" do
				@user.email = "testtest.test"
				subject {should_not be_valid}
			end
			
			it "should be valid" do
				@user.email = "test@test.test"
				subject {should be_valid}
			end
		end			

		describe "Testing email uniqueness" do
			before do
				user_with_same_email = @user.dup
				user_with_same_email.save
			end
			it { should_not be_valid }
		end


		describe "Testing password format" do
			describe "should be at least 6 char long" do
				before {@user = User.new(name: "Example", email: "test@test.com", password: "testt",
					password_confirmation: "testt")}
				subject {@user}
				it {should_not be_valid}
			end

			describe "valid password should be valid" do
				before {@user = User.new(name: "Example", email: "test@test.com", password: "testtt",
					password_confirmation: "testtt")}
				subject {@user}
				it {should be_valid}
			end
		end

		describe "when password doesn't match confirmation" do 
			before { @user.password_confirmation = "mismatch" } 
			it { should_not be_valid }
		end
	end

	describe "Should support valid operation" do
		before do
			@user = User.new(name: "Example", email: "test@test.com", password: "testtest",
				password_confirmation: "testtest")
			@user.save
		end
		subject {@user}

		it {should be_valid}

		it "should be able to delete existing user" do
			@user.destroy
			subject {should be_valid}
		end
	end


end
